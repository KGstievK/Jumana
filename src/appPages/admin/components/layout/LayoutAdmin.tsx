
import { FC, ReactNode } from 'react';
import scss from './LayoutAuth.module.scss';

interface LayoutAdminProps {
	children: ReactNode;
}

const LayoutAdmin: FC<LayoutAdminProps> = ({ children }) => {
	return (
		<div className={scss.LayoutPage}>
			<main>{children}</main>
		</div>
	);
};
export default LayoutAdmin;
