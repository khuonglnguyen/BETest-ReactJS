import { Component, ReactNode } from 'react';
import './App.scss';
import AppRoutes from '@/routes/routes';

export default class App extends Component {
  public render(): ReactNode {
    return <AppRoutes />;
  }
}
