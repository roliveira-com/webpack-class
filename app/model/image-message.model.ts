import Message from './message.model';

export default class ImageMessage extends Message {

  constructor(text:string = '', 
              created:number = Date.now(), 
              public url: string = '', 
              public thumbnail: string = '') {
    super(text, created);
  }

  /**
   * Method overriden
   * @returns String
   */
  public toString(): string {
    return `Photo${super.toString()} ` +
           `- Url: ${this.url} ` +
           `- Thumbnail: ${this.thumbnail}`;
  }
}
