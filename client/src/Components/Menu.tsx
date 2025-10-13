import type { MenuProps } from 'antd';
import { Menu as AntMenu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: 'Home',
        key: 'home',
    },
    {
        label: 'Articles',
        key: 'artices',
    },

];

const Menu: React.FC = () => {

    return <AntMenu mode="horizontal" items={items} />;
};

export default Menu;