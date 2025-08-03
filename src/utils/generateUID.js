export default function generateUID() {
    const now = new Date();
    const year = now.getFullYear();
    const number = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    return `AURA-${year}-${number}`;
}
