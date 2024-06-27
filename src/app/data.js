export async function fetchTabla() {
  try {
    const response = await fetch('http://localhost:8000/api/dispositivos');
    if (!response.ok) {
      throw new Error('Error en la respuesta');
    }
    const data = await response.json();
    return data.dispositivos;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}