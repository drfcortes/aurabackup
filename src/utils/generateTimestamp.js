export default function generateTimestamp() {
    const now = new Date();
    return now.toISOString();
}
