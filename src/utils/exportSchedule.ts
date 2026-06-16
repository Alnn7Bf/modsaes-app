export async function exportSchedulePNG(element : HTMLElement) {
    const { default: html2canvas } = await import("html2canvas");

    const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
    });

    const image = canvas.toDataURL('image/png');

    const link = document.createElement('a');

    link.download = 'horario.png';
    link.href = image;
    link.click();
}