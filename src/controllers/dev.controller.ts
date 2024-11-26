export default class DevController {
  static forceCrash() {
    throw new Error('Force crashing the server');
  }
}
