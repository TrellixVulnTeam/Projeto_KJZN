import React from 'react';
import { Counter } from './components/Counter';
import { RepositoryList } from './components/RepositoryList';
import './Styles/Global.scss';

export function App(){
    
    return (
        <>
            <RepositoryList/>
            <Counter/>
        </>
    );
}