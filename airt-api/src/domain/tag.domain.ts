export class TagDomain {
  constructor(name: string) {
    this.name = this.formatString(name);
  }

  name: string;

  private formatString(value: string) {
    return value
      .replace('-', ' ')
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  }
}
