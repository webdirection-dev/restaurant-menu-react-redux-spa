import React, {Component} from 'react';
import Error from '../error';

export default class ErrorBoundry extends Component {
    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({error: true})
    }

    render() {
        const {error} = this.state;

        if (error) return <Error />

        //props.children - рендер всего, что внутри <ErrorBoundry />
        else return this.props.children
    }
}