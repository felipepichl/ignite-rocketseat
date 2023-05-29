import { container } from "tsyringe";

import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IDateProvider } from "./DateProvider/model/IDateProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { IMailProvider } from "./MailProvider/model/IMailProvider";

const providers = {
  dayjs: DayjsDateProvider,
  etherealMail: new EtherealMailProvider(),
};

container.registerSingleton<IDateProvider>("DateProvider", providers.dayjs);

container.registerInstance<IMailProvider>(
  "MailProvider",
  providers.etherealMail
);
