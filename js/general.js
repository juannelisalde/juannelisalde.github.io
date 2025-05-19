// npx javascript-obfuscator c:\xampp\htdocs\juannelisalde.github.io\js\general.js --output c:\xampp\htdocs\juannelisalde.github.io\js\general.obfuscated.js

const hostLogin = "https://citas.usiese.gov.co:6007/api/Generales/ApiGeSeguridad/IniciarSesionCentroAtencion";
const dataLogin = {
  "oidUsuario":1,
  "oidCentroAtencion":1
};

// const hostDocument = "https://citas.usiese.gov.co:6007/odata/BaseConsulta/?tipo=Generales.GEENPaciente&%24select=Oid%2CDocumento%2CTipoDocumento%2CNombreCompleto%2CCarpeta1%2CCodigoCotizante%2CSexo%2CEstadoPaciente%2CRecienNacido%2CHistoriaCl%C3%ADnicaBloqueada&%24filter=Documento%20eq%20";
const hostDocument = "https://citas.usiese.gov.co:6007/api/Generales/ApiGeReporteGenerado/ExportarReporte";

const hostFolio = "https://citas.usiese.gov.co:6007/api/HistoriaClinica/HistoriaClinicaConsulta/ObtenerHistoricoFolios/?oidIngreso=0&directivas=true&hcUnificada=false&id=";

let allData = [];

const noPrintEspecialidad = ["ODONTOLOGIA GENERAL"];
const noPrintDiagnostico = ["CARIES DE LA DENTINA"];
const noImprimir = ["CONSULTA EXTERNA", "URGENCIAS", "TRIAGE"];

const showSpinner = () => {$("#spinner").removeClass("d-none")};

const hideSpinner = () => {$("#spinner").addClass("d-none")};

$(".clean").on("click", function () {
  $(this).parent().find("input").val("");
  $(this).parent().find("textarea").val("");
  $(".results").addClass("d-none");
});

$("#documents").on("input", function () {
  const validCharacters = /^[0-9,\s]*$/; // Permitir números, comas y espacios
  let value = $(this).val();

  // Reemplazar saltos de línea (\n) por comas (,)
  value = value.replace(/[\n\r]+/g, ",");

  // Validar caracteres permitidos
  if (!validCharacters.test(value)) {
    value = value.replace(/[^0-9,\s,]/g, ""); // Eliminar caracteres no válidos
  }
  // Actualizar el valor del campo
  $(this).val(value);
});

$("#formDownloadDates").on("submit", async function (e) {
  e.preventDefault();
  $("#resultContainerDownloadDates").empty();
  allData = []; // Reiniciar el array allData

  let documents = $("#documents").val().split(",");
  documents = documents.map((doc) => doc.trim());
  documents.sort((a, b) => a - b);
  documents = [...new Set(documents)];
  documents = documents.filter((doc) => doc !== "" && doc.length > 0);

  if (documents.length === 0) {
    alert("No se encontraron documentos válidos.");
    return;
  }

  showSpinner();

  try {
    await Promise.all(documents.map((document) => getDocument(document)));
    $("#resultContainerDownloadDatesCard").removeClass("d-none");
    hideSpinner();
  } catch (error) {
    console.error("Error al procesar los documentos:", error);
    hideSpinner();
  }
});

$("#downloadCSV").on("click", function () {
  if($("#resultContainerDownloadDates").children().length === 0){
    alert("No hay datos para descargar.");
    return;
  }
  exportResultContainerToCSV("Resultado.csv");
});

const getToken =  () => {
  if (localStorage.getItem("token")) {
    return localStorage.getItem("token");
  }

  $.ajax({
    url: hostLogin,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(dataLogin),
    success: function (response) {
      const token = response.token;
      localStorage.setItem("token", token);
      return token;
    },
    error: function (error) {
      console.error("Error al obtener el token:", error);
      return null;
    }
  });
}

const getParams = (document) => {
  return encodeURIComponent(
    JSON.stringify({
      "Nombre": "SERVICIOS PRESTADOS A PACIENTES",
      "Descripcion": "SERVICIOS PRESTADOS A PACIENTES",
      "SentenciaSQL": "",
      "Estado": "Activo",
      "Parametros": [
          {
              "Nombre": "DOCUMENTO",
              "Campo": "GENPACIEN.PACNUMDOC =",
              "Tipo": "String",
              "DbNombre": "DOCUMENTO",
              "DbNombreCompleto": "@DOCUMENTO",
              "DbTamano": 30,
              "DbTipo": "String",
              "Valor": document,
              "Oid": 1,
              "IdBloqueo": null,
              "RegistroEliminado": false,
              "OidResult": null
          }
      ],
      "formato": "XLSX PLANO",
      "SerializadoXml": true,
      "Oid": 26, //  26
      "IdBloqueo": null,
      "RegistroEliminado": false,
      "OidResult": null
  }));
}

// retornar data
const readExcelFromBlob = (blob) => {
  const reader = new FileReader();
  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });

    // Leer la primera hoja
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); 
    
    // Iterar sobre las filas del JSON
    jsonData.forEach((row, index) => {
      if (index > 0) { // Ignorar la primera fila (encabezados)
        let PACNUMDOC = row[1];
        let NOMBRE = row[2] + " " + row[3] + " " + row[4] + " " + row[5];
        let SEXO = row[6];
        let EDAD_ACTUAL = row[8];
        let EDAD_SERVICIO = row[9];
        let SIPCODIGO = row[20];
        let SIPNOMBRE = row[21];
        let SERFECSER = excelDateToJSDate(row[30]);

        // Agregar los datos al contenedor
        $("#resultContainerDownloadDates").append(
          `<p>${PACNUMDOC}, ${NOMBRE}, ${SEXO}, ${EDAD_ACTUAL}, ${EDAD_SERVICIO}, ${SIPCODIGO}, ${SIPNOMBRE}, ${excelDateToJSDate(SERFECSER)}</p>`
        );
      }
    });
  }
  reader.readAsArrayBuffer(blob);
}

const excelDateToJSDate = (serial) => {
  // El número 25569 corresponde al 1 de enero de 1970 en el sistema de fechas de Excel
  const utcDays = serial - 25569; 
  const utcValue = utcDays * 86400; // Convertir días a segundos
  const dateInfo = new Date(utcValue * 1000); // Crear un objeto Date en milisegundos

  // Formatear la fecha a DD/MM/YYYY
  const day = String(dateInfo.getUTCDate()).padStart(2, "0");
  const month = String(dateInfo.getUTCMonth() + 1).padStart(2, "0");
  const year = dateInfo.getUTCFullYear();

  return `${day}/${month}/${year}`;
};

const getDocument = (document) => {
  if ($("#resultContainerDownloadDates").children().length === 0) {
    $("#resultContainerDownloadDates").append(`<p><b>PACNUMDOC; NOMBRE; SEXO; EDAD_ACTUAL; EDAD_SERVICIO; SIPCODIGO; SIPNOMBRE; SERFECSER</b></p>`);
  }

  return new Promise((resolve) => {
    $.ajax({
      url: hostDocument,
      type: "GET",
      headers: {
        repparams: getParams(document),
        Authorization: `Bearer ${getToken()}`,
      },
      xhrFields: {
        responseType: "blob",
      },
      success: function (response) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });

          // Leer la primera hoja
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          // Iterar sobre las filas del JSON
          let finded = false;
          let SIPCODIGOS = [];
          jsonData.forEach((row, index) => {
            if (index > 0) { // Ignorar la primera fila (encabezados)
              const PACNUMDOC = row[1];
              const NOMBRE = replaceAccents(`${row[2]} ${row[3]} ${row[4]} ${row[5]}`);
              const SEXO = row[6];
              const EDAD_ACTUAL = replaceAccents(row[8]);
              const EDAD_SERVICIO = replaceAccents(row[9]);
              const SIPCODIGO = row[20];
              const SIPNOMBRE = replaceAccents(row[21]);
              const SERFECSER = excelDateToJSDate(row[30]);

              if (noImprimir.some((item) => SIPNOMBRE.includes(item.toUpperCase()))) {
                return;
              }

              if(!PACNUMDOC){
                $("#resultContainerDownloadDates").append(`<p>${document}; sin citas</p>`);
                finded = true;
                return;
              }

              if (!SIPCODIGOS.includes(SIPCODIGO)) {
                $("#resultContainerDownloadDates").append(`<p>${PACNUMDOC}; ${NOMBRE}; ${SEXO}; ${EDAD_ACTUAL}; ${EDAD_SERVICIO}; ${SIPCODIGO}; ${SIPNOMBRE}; ${SERFECSER}</p>`);
              } 

              SIPCODIGOS.push(SIPCODIGO);
              finded = true;
            }
          });
          if(!finded){
            $("#resultContainerDownloadDates").append(`<p>${document}; sin PM</p>`);
          }
        };
        reader.readAsArrayBuffer(response);
        resolve();
      },
      error: function (error) {
        console.error("Error al obtener el documento:", error);
        resolve(); // Resolver la promesa incluso en caso de error
      },
    });
  });
};

const exportResultContainerToCSV = (fileName) => {
  const rows = [];
  $("#resultContainerDownloadDates").children().each(function () {
    const text = $(this).text().trim();
    if (text) {
      rows.push(text);
    }
  });

  // Unir las filas con saltos de línea
  const csvContent = rows.join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${fileName}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const replaceAccents = (text) => {
  if (!text) return ""; 
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const processDates = (dates) => {
  return dates.map((date) => {
    const parts = date.split("/");
    if (parts.length !== 3) {
      return "Fecha inválida"; 
    }

    let [day, month, year] = parts.map((part) => parseInt(part, 10));
        
    if (month > 12) {      
      return `${month}/${day}/${year}`;
    }    

    return `${day}/${month}/${year}`;
  });
};

$("#formFormatDates").on("submit", async function (e) {
  e.preventDefault();
  showSpinner();
  $("#resultContainerFormatDates").empty();
  
  let dates = $("#dates").val().replace(/[\n\r]+/g, ",").split(",");
  dates = dates.map((date) => date.trim());
  dates = dates.filter((date) => date !== "");

  const processedDates = processDates(dates);

  processedDates.forEach((date) => {
    $("#resultContainerFormatDates").append(`${date}</br>`);
  });
  $("#resultContainerFormatDatesCard").removeClass("d-none");
  hideSpinner();
});

$("#copyFormattedDates").on("click", function () {
  // Obtener las fechas formateadas del contenedor con las etiquetas <br>
  const formattedDates = $("#resultContainerFormatDates").html().trim();

  if (formattedDates) {
    // Separar las fechas por etiquetas <br>, hacer trim a cada una y unirlas con saltos de línea
    const formattedForClipboard = formattedDates
      .split("<br>") // Dividir por etiquetas <br>
      .map(date => date.trim()) // Hacer trim a cada fecha
      .filter(date => date !== "") // Filtrar fechas vacías
      .join("\n"); // Unir con saltos de línea

    // Copiar al portapapeles
    navigator.clipboard.writeText(formattedForClipboard)
      .then(() => {
        alert("Fechas copiadas al portapapeles");
      })
      .catch((err) => {
        console.error("Error al copiar las fechas: ", err);
        alert("No se pudieron copiar las fechas");
      });
  } else {
    alert("No hay fechas formateadas para copiar");
  }
});

$("#formExcel").on("submit", async function (e) {
  e.preventDefault();
  const data = new FormData(this);
  const fileInput = document.getElementById("file");
  const nameFile = fileInput.files[0].name;
  showSpinner();
  $.ajax({
    url: "https://tudinerodev.com/envios/pruebas/general.php",
    type: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    data: data,
    processData: false,
    contentType: false,
    success: function (base64) {
      const link = document.createElement('a');
      link.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + base64;
      link.download = "reporte-" + nameFile;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      hideSpinner();
    },
    error: function (error) {
      console.error("Error al obtener el documento:", error);
      hideSpinner();
    },
  });
});