declare interface MenuItem {
  title?: string;
  action?: (d: any) => void;
  divider?: boolean;
  disabled?: boolean;
  className?: string;
  children?: MenuItem[];
}

declare interface Position {
  top: number;
  left: number;
}

declare interface Config {
  onOpen?: () => void;
  onClose?: () => void;
  position?: Position | ((d: any) => Position);
}

type ContextMenuFn<DataType> = (data: DataType, index: number) => void;

declare function contextMenu<DataType>(menuItems: MenuItem[], onOpen?: () => void): ContextMenuFn<DataType>;
declare function contextMenu<DataType>(menuItems: MenuItem[], config: Config): ContextMenuFn<DataType>;

export { MenuItem, Position, Config };

export default contextMenu;
