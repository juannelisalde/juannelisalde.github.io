<?php
ini_set('memory_limit', '1024M');

require_once __DIR__ . '/vendor/autoload.php';
use PhpOffice\PhpSpreadsheet\IOFactory;

class readExcel{
  public function readExcelFile($filePath) {
    // Load the Excel file
    $spreadsheet = IOFactory::load($filePath);

    // Get the first sheet
    $sheet = $spreadsheet->getActiveSheet();
    $data = [];
    // Loop through each row in the sheet
    foreach ($sheet->getRowIterator() as $row) {
        $rowData = [];
        foreach ($row->getCellIterator() as $cell) {
            $rowData[] = $cell->getValue();
        }
        // Solo agrega la fila si tiene al menos un valor no vacío
        if (count(array_filter($rowData, fn($v) => trim($v) !== '')) > 0) {
            $data[] = $rowData;
        }
    }
    // Return the data
    return $data;
  }

  function transformarExcelPlano($data) {
      $resultado = [];
      $cabecera = null;
      $colFActual = null;
      $bloque = [];
      $nums = [];
      $vacunadores = [];
      $registros = [];
      $coordinadora = null;
      $ubicacion = null;
      $fecha = null;
      $hora = null;
      $totalEquipo = null;
      $responsable = null;

      foreach ($data as $fila) {
          // 1. Procesar cabecera
          if ($this->isCabecera($fila)) {
              $cabecera = array_slice($fila, 0, 9);
              $resultado[] = array_filter($cabecera, fn($v) => trim($v) !== '');
              continue;
          }

          // Detectar si la fila es de celdas combinadas
          $esCombinado = true;
          for ($i = 0; $i <= 5; $i++) {
              if (isset($fila[$i]) && trim($fila[$i]) !== '') {
                  $esCombinado = false;
                  break;
              }
          }

          // 2. Detectar cambio de bloque (columna F)
          $colF = isset($fila[5]) ? trim($fila[5]) : '';
          if ($colF !== '' && $colF !== $colFActual) {
              if ($colFActual !== null) {
                  $this->agregarLineasPlano($resultado, $bloque, $nums, $vacunadores, $registros, $esCombinado);
              }
              list($bloque, $coordinadora, $ubicacion, $fecha, $hora, $totalEquipo, $responsable) = $this->iniciarBloque($fila, $coordinadora, $ubicacion, $fecha, $hora, $totalEquipo, $responsable);
              $nums = [];
              $vacunadores = [];
              $registros = [];
              $colFActual = $colF;
          }

          // 3. Acumular datos GHI
          if (
              (isset($fila[6]) && trim($fila[6]) !== '') 
              || (isset($fila[8]) && trim($fila[8]) !== '')
          ) {
              $this->procesarGHIFila($fila, $nums, $vacunadores, $registros);
          }
      }

      // 4. Guardar el último bloque
      if ($colFActual !== null) {
          $this->agregarLineasPlano($resultado, $bloque, $nums, $vacunadores, $registros, false);
      }

      return $resultado;
  }

  function agregarLineasPlano(&$resultado, $bloque, $nums, $vacunadores, $registros, $esCombinado = false) {
      if ($esCombinado && count($nums) > 1) {
          // Primera línea: todos los registros menos el último juntos
          $primeraLineaRegistros = array_slice($registros, 0, count($registros) - 1);
          $linea1 = array_merge(
              $bloque,
              [$nums[0]],
              [$vacunadores[0]],
              [implode(', ', $primeraLineaRegistros)]
          );
          $resultado[] = $linea1;

          // Segunda línea: solo el último registro
          $linea2 = array_merge(
              $bloque,
              [$nums[1]],
              [$vacunadores[1]],
              [end($registros)]
          );
          $resultado[] = $linea2;
      } else {
          // Caso general: una sola línea por bloque, todo separado por coma
          $resultado[] = array_merge(
              $bloque,
              [implode(', ', $nums)],
              [implode(', ', $vacunadores)],
              [implode(', ', $registros)]
          );
      }
  }

  function isCabecera($fila) {
      return isset($fila[0]) && trim($fila[0]) === 'COORDINADORA';
  }

  function iniciarBloque($fila, $coordinadora, $ubicacion, $fecha, $hora, $totalEquipo, $responsable) {
      $coordinadora = isset($fila[0]) ? trim($fila[0]) : $coordinadora;
      $ubicacion = isset($fila[1]) ? trim($fila[1]) : $ubicacion;
      $fechaExcel = isset($fila[2]) ? trim($fila[2]) : $fecha;
      if (is_numeric($fechaExcel) && $fechaExcel > 30000) {
          $unixDate = ($fechaExcel - 25569) * 86400;
          $fecha = gmdate('d/m/Y', $unixDate);
      } else {
          $fecha = $fechaExcel;
      }
      $hora = isset($fila[3]) ? trim($fila[3]) : $hora;
      $totalEquipo = isset($fila[4]) ? trim($fila[4]) : $totalEquipo;
      $responsable = isset($fila[5]) ? trim($fila[5]) : $responsable;

      $bloque = [$coordinadora, $ubicacion, $fecha, $hora, $totalEquipo, $responsable];
      return [$bloque, $coordinadora, $ubicacion, $fecha, $hora, $totalEquipo, $responsable];
  }

  function procesarGHIFila($fila, &$nums, &$vacunadores, &$registros) {
      $valorNum = trim($fila[6]);
      $valorVac = isset($fila[7]) ? trim($fila[7]) : '';
      $valorReg = isset($fila[8]) ? trim($fila[8]) : '';

      if ($valorNum !== '') $nums[] = $valorNum;
      if ($valorVac !== '') $vacunadores[] = $valorVac;
      if ($valorReg !== '') $registros[] = $valorReg;
  }

}

// Usage example
$excelReader = new readExcel();
die(phpinfo());
$filePath = $_FILES['file']['tmp_name'];
if (!file_exists($filePath)) {
    die("El archivo no existe.");
}

$data = $excelReader->readExcelFile($filePath);

// Después de obtener $data procesado:
$data = $excelReader->transformarExcelPlano($data);
// echo "<pre>";
// foreach ($data as $row) {
//     echo implode(' | ', $row) . "\n";
// }
// echo "</pre>";
// die();

$spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
// Crear nuevo Excel y escribir los datos
$sheet = $spreadsheet->getActiveSheet();

$rowNum = 1;
foreach ($data as $row) {
    $colNum = 1;
    foreach ($row as $cell) {
        $colLetter = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($colNum);
        $sheet->setCellValue($colLetter . $rowNum, $cell);

        if($rowNum == 1){
            $sheet->getStyle($colLetter . $rowNum)->getFont()->setBold(true);
        }
        $colNum++;
    }
    $rowNum++;
}

// Guardar el archivo Excel
$writer = new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($spreadsheet);
$filename = 'resultado_transformado.xlsx';
$writer->save($filename);
$base64 = base64_encode(file_get_contents($filename));
unlink($filename);
die($base64);

?>