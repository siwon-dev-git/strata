export {
  MenubarRoot,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
} from './Menubar';

import {
  MenubarRoot,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
} from './Menubar';

export const Menubar: {
  Root: typeof MenubarRoot;
  Menu: typeof MenubarMenu;
  Trigger: typeof MenubarTrigger;
  Content: typeof MenubarContent;
  Item: typeof MenubarItem;
  Separator: typeof MenubarSeparator;
  Label: typeof MenubarLabel;
} = {
  Root: MenubarRoot,
  Menu: MenubarMenu,
  Trigger: MenubarTrigger,
  Content: MenubarContent,
  Item: MenubarItem,
  Separator: MenubarSeparator,
  Label: MenubarLabel,
};
