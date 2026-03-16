export async function get_poetsList() {
    const url = "https://ochre.uchicago.edu/digs30005-poetry-database";
    const response = await fetch(url);
    const poets = await response.json();
    return poets;
}