import axios from 'axios';

let handler = async (m, { conn, text }) => {
let sentMessage = await m.reply("Buscando...");
  if (!text) return conn.reply(m.chat, "Ingrese una dirección IP válida", m);

  try {
    const response = await axios.get(`http://ip-api.com/json/${text}?fields=status,message,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,isp,org,as,mobile,hosting,query`);
    const data = response.data;

  if (String(data.status) !== "success") {
      throw new Error(data.message || "Falló");
    }

    let hasil = `
*IP CHECKER*

IP : ${data.query}
País : ${data.country}
Código de País : ${data.countryCode}
Provincia : ${data.regionName}
Código de Provincia : ${data.region}
Ciudad : ${data.city}
Distrito : ${data.district}
Código Postal : ${data.zip}
Coordenadas : ${data.lat}, ${data.lon}
Zona Horaria : ${data.timezone}
ISP : ${data.isp}
Organización : ${data.org}
AS : ${data.as}
Mobile : ${data.mobile ? "Si" : "No"}
Hosting : ${data.hosting ? "Si" : "No"}
`.trim();

     await conn.sendMessage(m.chat, { text: hasil, edit: sentMessage.key }); // Editar con conn.sendMessage
  } catch (error) { 
    await conn.sendMessage(m.chat, { 
      text: `Error al intentar obtener información de la IP: ${error.message}`,
      edit: sentMessage.key
    });
  }
};

handler.help = ['ip', 'ipcheck', 'ipcek'].map(v => v + ' <alamat ip>')
handler.tags = ['tools']
handler.command = /^(ip|ipcheck|ipcek)$/i
handler.owner = false
export default handler