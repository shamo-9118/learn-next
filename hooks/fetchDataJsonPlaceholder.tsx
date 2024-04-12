export async function fetchDataJsonPlaceholder() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    if (!response.ok) {
      throw new Error('ネットワークエラー: ' + response.status);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('データを取得できませんでした:', error);
  }
}
