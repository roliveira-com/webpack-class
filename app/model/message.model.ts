// Mensagens
export default class Message {

  // public text: string;
  // private readonly created: number

  //usando a sintaxe shorthand declarando
  //propriedades direto no contrutor
  constructor(public text: string = '', 
              public  readonly created: number = Date.now()) {
    this.text = text;
    this.created = created;
  }

  public toString(): string {
    const { created, text } = this;
    return `Message created at: ${created} - Text: ${text}`;
  }

  public static newEmptyMessage(): Message {
    return new Message();
  }
}