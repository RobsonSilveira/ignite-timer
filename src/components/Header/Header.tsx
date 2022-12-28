import { NavLink } from 'react-router-dom';
import { Timer, Scroll } from 'phosphor-react';
import LogoIgnite from '../../assets/svg/logo-ignite.svg';

import { HeaderContainer } from './styles';

export const Header = () => {
  return (
    <HeaderContainer>
      <img src={LogoIgnite} alt='Logo Ignite' />
      <nav>
        <NavLink to='/' end title='Timer'>
          <Timer size={24} />
        </NavLink>
        <NavLink to='/history' title='Histórico'>
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
};
