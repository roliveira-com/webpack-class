import Message from './model/message.model';
import ImageMessage from './model/image-message.model';

function messageFactory (text:string): Promise<Message> {
  const giphy = /\/giphy ('.*'|\w+)/;
  if(giphy.test(text)){
    const match: string = (text.match(giphy) as string[])[1];

    return fetch(`http://api.giphy.com/v1/gifs/search?q=${match}&api_key=ZOauHFVCI3QvdpHTHfzzLgFTjUrpKKAy`, {
      method: 'GET',
      mode: 'cors',
    })
    .then((response: Response) => response.json())
    .then((result: any) => {
      const replaced = text.replace(giphy, `<img src="${result.data[0].images.fixed_height_small.url}">`);
      return new ImageMessage(replaced, undefined, result.data[0].embed_url);
    })
    .catch(() => new Message(text)) as Promise<Message>;
  }

  return Promise.resolve(new Message(text));
}

//Tipo genérico representando pelo <N>
// na classe abaixo
class Store<N> {
  private store: Set<N>;
  constructor(){
    const sStore: (string | null) = localStorage.getItem('store');
    this.store = sStore ? new Set<N>(JSON.parse(sStore)) : new Set<N>();
  }

  public add(item: N): void {
    //console.log(this.store);
    this.store.add(item);
  }

  public commit(): void {
    localStorage.setItem('store', JSON.stringify(Array.from(this.store)));
  }

  public list(): N[] {
    return Array.from(this.store);
  }
}

export { messageFactory, Store };