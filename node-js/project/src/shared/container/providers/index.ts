import { container } from "tsyringe";

import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IDateProvider } from "./DateProvider/model/IDateProvider";

const providers = {
  dayjs: DayjsDateProvider,
};

container.registerSingleton<IDateProvider>("DateProvider", providers.dayjs);
