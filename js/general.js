// npx javascript-obfuscator c:\xampp\htdocs\juannelisalde.github.io\js\general.js --output c:\xampp\htdocs\juannelisalde.github.io\js\general.obfuscated.js

const hostLogin = "https://citas.usiese.gov.co:6007/api/Generales/ApiGeSeguridad/IniciarSesionCentroAtencion";
const dataLogin = {
  "oidUsuario":1,
  "oidCentroAtencion":1
};

const hostDocument = "https://citas.usiese.gov.co:6007/odata/BaseConsulta/?tipo=Generales.GEENPaciente&%24select=Oid%2CDocumento%2CTipoDocumento%2CNombreCompleto%2CCarpeta1%2CCodigoCotizante%2CSexo%2CEstadoPaciente%2CRecienNacido%2CHistoriaCl%C3%ADnicaBloqueada&%24filter=Documento%20eq%20";

const hostFolio = "https://citas.usiese.gov.co:6007/api/HistoriaClinica/HistoriaClinicaConsulta/ObtenerHistoricoFolios/?oidIngreso=0&directivas=true&hcUnificada=false&id=";

const allData = [];

const showSpinner = () => {
  $("#spinner").removeClass("d-none")
};

const hideSpinner = () => {
  $("#spinner").addClass("d-none")
};

$("#documents").on("input", function () {
  const validCharacters = /^[0-9,\s]*$/;
  const value = $(this).val();

  if (!validCharacters.test(value)) {
    $(this).val(value.replace(/[^0-9,\s]/g, ""));
  }
});

$("#formDocuments").on("submit", function (e) {
  e.preventDefault();
  $("#resultContainer").empty();
  allData.length = 0; 

  let documents = $("#documents").val().split(",");
  documents = documents.map((doc) => doc.trim());
  documents.sort((a, b) => a - b);
  documents = [...new Set(documents)]; 
  documents = documents.filter((doc) => doc !== "" && doc.length > 0); 

  if (documents.length === 0) {
    alert("No se encontraron documentos válidos.");
    return;
  }

  let completedRequests = 0; 
  const totalRequests = documents.length; 

  showSpinner();
  $.each(documents, function (index, document) {
    getDocument(document).then(() => {
      completedRequests++; // Incrementar el contador cuando una petición se complete

      // Si todas las peticiones han finalizado
      if (completedRequests === totalRequests) {
        hideSpinner();
        exportResultContainerToCSV("Resultados");
      }
    });
  });
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

const getFolio = (oid) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${hostFolio}${oid}`,
      type: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      success: function (response) {
        if (response.length > 0) {
          const folioInfoArray = response.map((folio) => {
            const { TipoHistoria, Especialidad, Fecha } = folio;
            return `Tipo Historia: ${TipoHistoria}, Especialidad: ${Especialidad}, Fecha: ${formatDate(Fecha)}`;
          });
          resolve(folioInfoArray);
        } else {
          resolve(`No se encontraron folios`);
        }
      },
      error: function (error) {
        console.error("Error al obtener el folio:", error);
        reject(error);
      },
    });
  });
};

const getDocument = (document) => {
  return new Promise((resolve) => {
    $.ajax({
      url: `${hostDocument}%27${document}%27`,
      type: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      success: function (response) {
        if (response.value.length > 0) {
          const data = response.value[0];
          const { NombreCompleto, Oid, Documento } = data;

          getFolio(Oid).then((folioInfo) => {
            const folioContent = Array.isArray(folioInfo) ? folioInfo : [folioInfo];

            // Escribir en el contenedor en formato similar al Excel
            $("#resultContainer").append(`<p><b>${Documento}, Nombre: ${NombreCompleto}</b></p>`);
            folioContent.forEach((folio) => {
              $("#resultContainer").append(`<p>${document},${folio}</p>`);
            });

            // Agregar una línea en blanco para separar documentos
            $("#resultContainer").append(`<br>`);
            resolve(); // Resolver la promesa cuando se complete
          });
        } else {
          // Escribir respuesta de documento no encontrado
          $("#resultContainer").append(`<p><b>${document}, No encontrado</b></p>`);
          $("#resultContainer").append(`<p>No encontrado</p>`);
          $("#resultContainer").append(`<br>`);
          resolve(); // Resolver la promesa cuando se complete
        }
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
  rows.push("Documento,Nombre,Fecha");

  $("#resultContainer").children().each(function () {
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

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};