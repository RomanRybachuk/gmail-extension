import ContentController from "../core/controllers/ContentController";

import Util from "../core/util/Util";

function bootstrap() {
  // console.log(1, "bootsterap");
  const content = new ContentController();

  content.init();

  Util.create_window_api(content);

  return content;
}

const instance = bootstrap();

export default instance;
