const a0_0x3b7184=a0_0x991c;function a0_0x416b(){const _0x2d0c17=['Resultado.csv','map','11019231BPTphZ','#documents','XLSX\x20PLANO','children','token','Bearer\x20','appendChild','#downloadCSV','toUpperCase','d-none','hidden','ODONTOLOGIA\x20GENERAL','Activo','329315PgNtFx','GENPACIEN.PACNUMDOC\x20=','1160252vmHliy','ajax','href','Error\x20al\x20procesar\x20los\x20documentos:','10430mamkwE','setAttribute','click','target','text','push','stringify','3107574DNDSjv','@DOCUMENTO','CONSULTA\x20EXTERNA','createElement','includes','empty','append','MEDICINA\x20GENERAL','Sheets','filter','getItem','#spinner','read','replace','forEach','POST','readAsArrayBuffer','GET','result','132ZUAHJI','.csv','val','getUTCDate','5397756XLJWHT','String','split','SheetNames','CARIES\x20DE\x20LA\x20DENTINA','visibility','</p>','No\x20hay\x20datos\x20para\x20descargar.','SERVICIOS\x20PRESTADOS\x20A\x20PACIENTES','normalize','<p><b>PACNUMDOC;\x20NOMBRE;\x20SEXO;\x20EDAD_ACTUAL;\x20EDAD_SERVICIO;\x20SIPCODIGO;\x20SIPNOMBRE;\x20SERFECSER</b></p>','application/json','removeChild','onload','https://citas.usiese.gov.co:6007/api/Generales/ApiGeReporteGenerado/ExportarReporte','No\x20se\x20encontraron\x20documentos\x20válidos.','padStart','some','style','<p>','getUTCMonth','text/csv;charset=utf-8;','length','download','DOCUMENTO','removeClass','setItem','URGENCIAS',';\x20No\x20encontrado</p>','input','preventDefault','128idycVG','addClass','getUTCFullYear','error','array','createObjectURL','utils','all','trim','101180GclgsK','#resultContainer','https://citas.usiese.gov.co:6007/api/HistoriaClinica/HistoriaClinicaConsulta/ObtenerHistoricoFolios/?oidIngreso=0&directivas=true&hcUnificada=false&id=','blob','NFD','#formDocuments'];a0_0x416b=function(){return _0x2d0c17;};return a0_0x416b();}(function(_0x5be573,_0xf0812a){const _0x5a7bb9=a0_0x991c,_0x1bf7e2=_0x5be573();while(!![]){try{const _0x1f826e=-parseInt(_0x5a7bb9(0x126))/0x1+parseInt(_0x5a7bb9(0x12a))/0x2+-parseInt(_0x5a7bb9(0x131))/0x3+parseInt(_0x5a7bb9(0x148))/0x4+-parseInt(_0x5a7bb9(0x10f))/0x5*(parseInt(_0x5a7bb9(0x144))/0x6)+parseInt(_0x5a7bb9(0x124))/0x7*(parseInt(_0x5a7bb9(0x167))/0x8)+parseInt(_0x5a7bb9(0x117))/0x9;if(_0x1f826e===_0xf0812a)break;else _0x1bf7e2['push'](_0x1bf7e2['shift']());}catch(_0x4e3be0){_0x1bf7e2['push'](_0x1bf7e2['shift']());}}}(a0_0x416b,0xa88ff));const hostLogin='https://citas.usiese.gov.co:6007/api/Generales/ApiGeSeguridad/IniciarSesionCentroAtencion',dataLogin={'oidUsuario':0x1,'oidCentroAtencion':0x1},hostDocument=a0_0x3b7184(0x156),hostFolio=a0_0x3b7184(0x111);let allData=[];const noPrintEspecialidad=[a0_0x3b7184(0x122)],noPrintDiagnostico=[a0_0x3b7184(0x14c)],noImprimir=[a0_0x3b7184(0x138),a0_0x3b7184(0x133),a0_0x3b7184(0x163),'TRIAGE'],showSpinner=()=>{const _0x39b83e=a0_0x3b7184;$('#spinner')[_0x39b83e(0x161)](_0x39b83e(0x120));},hideSpinner=()=>{const _0x2b365c=a0_0x3b7184;$(_0x2b365c(0x13c))[_0x2b365c(0x168)](_0x2b365c(0x120));};function a0_0x991c(_0x5aff78,_0x30c5c9){const _0x416bb9=a0_0x416b();return a0_0x991c=function(_0x991cdb,_0x153304){_0x991cdb=_0x991cdb-0x10c;let _0x37bd75=_0x416bb9[_0x991cdb];return _0x37bd75;},a0_0x991c(_0x5aff78,_0x30c5c9);}$(a0_0x3b7184(0x118))['on'](a0_0x3b7184(0x165),function(){const _0x88b3c2=a0_0x3b7184,_0x506d9f=/^[0-9,\s]*$/;let _0x5325d9=$(this)[_0x88b3c2(0x146)]();_0x5325d9=_0x5325d9[_0x88b3c2(0x13e)](/[\n\r]+/g,','),!_0x506d9f['test'](_0x5325d9)&&(_0x5325d9=_0x5325d9[_0x88b3c2(0x13e)](/[^0-9,\s]/g,'')),_0x5325d9=_0x5325d9[_0x88b3c2(0x13e)](/^,|,$/g,''),$(this)[_0x88b3c2(0x146)](_0x5325d9);}),$(a0_0x3b7184(0x114))['on']('submit',async function(_0x1366a3){const _0x2d8585=a0_0x3b7184;_0x1366a3[_0x2d8585(0x166)](),$('#resultContainer')[_0x2d8585(0x136)](),allData=[];let _0x44326e=$(_0x2d8585(0x118))['val']()[_0x2d8585(0x14a)](',');_0x44326e=_0x44326e[_0x2d8585(0x116)](_0x331d0d=>_0x331d0d[_0x2d8585(0x10e)]()),_0x44326e['sort']((_0x39f6d9,_0xa8aa0a)=>_0x39f6d9-_0xa8aa0a),_0x44326e=[...new Set(_0x44326e)],_0x44326e=_0x44326e[_0x2d8585(0x13a)](_0x3f65a1=>_0x3f65a1!==''&&_0x3f65a1[_0x2d8585(0x15e)]>0x0);if(_0x44326e[_0x2d8585(0x15e)]===0x0){alert(_0x2d8585(0x157));return;}showSpinner();try{await Promise[_0x2d8585(0x10d)](_0x44326e[_0x2d8585(0x116)](_0x125505=>getDocument(_0x125505))),hideSpinner();}catch(_0x3cb651){console[_0x2d8585(0x16a)](_0x2d8585(0x129),_0x3cb651),hideSpinner();}}),$(a0_0x3b7184(0x11e))['on']('click',function(){const _0x2aa5ba=a0_0x3b7184;if($('#resultContainer')[_0x2aa5ba(0x11a)]()[_0x2aa5ba(0x15e)]===0x0){alert(_0x2aa5ba(0x14f));return;}exportResultContainerToCSV(_0x2aa5ba(0x115));});const getToken=()=>{const _0x15256d=a0_0x3b7184;if(localStorage[_0x15256d(0x13b)]('token'))return localStorage[_0x15256d(0x13b)](_0x15256d(0x11b));$['ajax']({'url':hostLogin,'type':_0x15256d(0x140),'contentType':_0x15256d(0x153),'data':JSON[_0x15256d(0x130)](dataLogin),'success':function(_0x11a2f0){const _0x1551cf=_0x15256d,_0x580f77=_0x11a2f0['token'];return localStorage[_0x1551cf(0x162)](_0x1551cf(0x11b),_0x580f77),_0x580f77;},'error':function(_0xbb8175){const _0x4f3f9b=_0x15256d;return console[_0x4f3f9b(0x16a)]('Error\x20al\x20obtener\x20el\x20token:',_0xbb8175),null;}});},getParams=_0x3c89b2=>{const _0x259443=a0_0x3b7184;return encodeURIComponent(JSON[_0x259443(0x130)]({'Nombre':_0x259443(0x150),'Descripcion':_0x259443(0x150),'SentenciaSQL':'','Estado':_0x259443(0x123),'Parametros':[{'Nombre':_0x259443(0x160),'Campo':_0x259443(0x125),'Tipo':_0x259443(0x149),'DbNombre':'DOCUMENTO','DbNombreCompleto':_0x259443(0x132),'DbTamano':0x1e,'DbTipo':_0x259443(0x149),'Valor':_0x3c89b2,'Oid':0x1,'IdBloqueo':null,'RegistroEliminado':![],'OidResult':null}],'formato':_0x259443(0x119),'SerializadoXml':!![],'Oid':0x1a,'IdBloqueo':null,'RegistroEliminado':![],'OidResult':null}));},readExcelFromBlob=_0x1e2371=>{const _0x421296=a0_0x3b7184,_0x445efb=new FileReader();_0x445efb[_0x421296(0x155)]=function(_0xcbdea9){const _0x963826=_0x421296,_0x2e039a=new Uint8Array(_0xcbdea9[_0x963826(0x12d)][_0x963826(0x143)]),_0x17a1a8=XLSX[_0x963826(0x13d)](_0x2e039a,{'type':_0x963826(0x16b)}),_0x2d00f6=_0x17a1a8[_0x963826(0x14b)][0x0],_0x270a34=_0x17a1a8['Sheets'][_0x2d00f6],_0x49b645=XLSX[_0x963826(0x10c)]['sheet_to_json'](_0x270a34,{'header':0x1});_0x49b645[_0x963826(0x13f)]((_0x5b0942,_0x50d7a4)=>{const _0x5ac322=_0x963826;if(_0x50d7a4>0x0){let _0x538f2d=_0x5b0942[0x1],_0x4d86b2=_0x5b0942[0x2]+'\x20'+_0x5b0942[0x3]+'\x20'+_0x5b0942[0x4]+'\x20'+_0x5b0942[0x5],_0x408180=_0x5b0942[0x6],_0x3c5dae=_0x5b0942[0x8],_0x20551a=_0x5b0942[0x9],_0x174565=_0x5b0942[0x14],_0xe657e6=_0x5b0942[0x15],_0x70f99b=excelDateToJSDate(_0x5b0942[0x1e]);$('#resultContainer')['append'](_0x5ac322(0x15b)+_0x538f2d+',\x20'+_0x4d86b2+',\x20'+_0x408180+',\x20'+_0x3c5dae+',\x20'+_0x20551a+',\x20'+_0x174565+',\x20'+_0xe657e6+',\x20'+excelDateToJSDate(_0x70f99b)+_0x5ac322(0x14e));}});},_0x445efb[_0x421296(0x141)](_0x1e2371);},excelDateToJSDate=_0x1befd9=>{const _0x1acf94=a0_0x3b7184,_0x54c731=_0x1befd9-0x63e1,_0x323288=_0x54c731*0x15180,_0x191ec2=new Date(_0x323288*0x3e8),_0x30ef68=String(_0x191ec2[_0x1acf94(0x147)]())[_0x1acf94(0x158)](0x2,'0'),_0x1fa3c8=String(_0x191ec2[_0x1acf94(0x15c)]()+0x1)['padStart'](0x2,'0'),_0x20dbe5=_0x191ec2[_0x1acf94(0x169)]();return _0x30ef68+'/'+_0x1fa3c8+'/'+_0x20dbe5;},getDocument=_0x16213f=>{const _0x420e1c=a0_0x3b7184;return $(_0x420e1c(0x110))[_0x420e1c(0x11a)]()[_0x420e1c(0x15e)]===0x0&&$(_0x420e1c(0x110))[_0x420e1c(0x137)](_0x420e1c(0x152)),new Promise(_0x3b4ebd=>{const _0x17e721=_0x420e1c;$[_0x17e721(0x127)]({'url':hostDocument,'type':_0x17e721(0x142),'headers':{'repparams':getParams(_0x16213f),'Authorization':_0x17e721(0x11c)+getToken()},'xhrFields':{'responseType':_0x17e721(0x112)},'success':function(_0x305fcf){const _0x2d0fbd=_0x17e721,_0x5bd9ed=new FileReader();_0x5bd9ed[_0x2d0fbd(0x155)]=function(_0x2e057a){const _0xbdc346=_0x2d0fbd,_0x1563fe=new Uint8Array(_0x2e057a['target'][_0xbdc346(0x143)]),_0x2ca6c9=XLSX['read'](_0x1563fe,{'type':_0xbdc346(0x16b)}),_0x251e22=_0x2ca6c9[_0xbdc346(0x14b)][0x0],_0x46b9d8=_0x2ca6c9[_0xbdc346(0x139)][_0x251e22],_0x15c96b=XLSX['utils']['sheet_to_json'](_0x46b9d8,{'header':0x1});_0x15c96b[_0xbdc346(0x13f)]((_0xbafcf5,_0xd7424b)=>{const _0x22e7b3=_0xbdc346;if(_0xd7424b>0x0){const _0x54bda2=_0xbafcf5[0x1],_0x297901=replaceAccents(_0xbafcf5[0x2]+'\x20'+_0xbafcf5[0x3]+'\x20'+_0xbafcf5[0x4]+'\x20'+_0xbafcf5[0x5]),_0x3ee391=_0xbafcf5[0x6],_0x332817=replaceAccents(_0xbafcf5[0x8]),_0x38dadb=replaceAccents(_0xbafcf5[0x9]),_0x1f085d=_0xbafcf5[0x14],_0x5659cd=replaceAccents(_0xbafcf5[0x15]),_0x60426f=excelDateToJSDate(_0xbafcf5[0x1e]);if(noImprimir[_0x22e7b3(0x159)](_0x48b3d2=>_0x5659cd[_0x22e7b3(0x135)](_0x48b3d2[_0x22e7b3(0x11f)]())))return;if(!_0x54bda2){$(_0x22e7b3(0x110))[_0x22e7b3(0x137)](_0x22e7b3(0x15b)+_0x16213f+_0x22e7b3(0x164));return;}$(_0x22e7b3(0x110))[_0x22e7b3(0x137)]('<p>'+_0x54bda2+';\x20'+_0x297901+';\x20'+_0x3ee391+';\x20'+_0x332817+';\x20'+_0x38dadb+';\x20'+_0x1f085d+';\x20'+_0x5659cd+';\x20'+_0x60426f+'</p>');}});},_0x5bd9ed['readAsArrayBuffer'](_0x305fcf),_0x3b4ebd();},'error':function(_0x6bc11){const _0x25d60f=_0x17e721;console[_0x25d60f(0x16a)]('Error\x20al\x20obtener\x20el\x20documento:',_0x6bc11),_0x3b4ebd();}});});},exportResultContainerToCSV=_0x5b2000=>{const _0x912006=a0_0x3b7184,_0x2a9666=[];$(_0x912006(0x110))[_0x912006(0x11a)]()['each'](function(){const _0xda3189=_0x912006,_0x2718c1=$(this)[_0xda3189(0x12e)]()[_0xda3189(0x10e)]();_0x2718c1&&_0x2a9666[_0xda3189(0x12f)](_0x2718c1);});const _0x2309f3=_0x2a9666['join']('\x0a'),_0x1ecf10=new Blob([_0x2309f3],{'type':_0x912006(0x15d)}),_0x58ffa0=document[_0x912006(0x134)]('a'),_0x48043a=URL[_0x912006(0x16c)](_0x1ecf10);_0x58ffa0[_0x912006(0x12b)](_0x912006(0x128),_0x48043a),_0x58ffa0[_0x912006(0x12b)](_0x912006(0x15f),_0x5b2000+_0x912006(0x145)),_0x58ffa0[_0x912006(0x15a)][_0x912006(0x14d)]=_0x912006(0x121),document['body'][_0x912006(0x11d)](_0x58ffa0),_0x58ffa0[_0x912006(0x12c)](),document['body'][_0x912006(0x154)](_0x58ffa0);},replaceAccents=_0x2e0c63=>{const _0x2121c4=a0_0x3b7184;if(!_0x2e0c63)return'';return _0x2e0c63[_0x2121c4(0x151)](_0x2121c4(0x113))['replace'](/[\u0300-\u036f]/g,'');};