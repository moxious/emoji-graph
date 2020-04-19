import { Icon, List, Loader, Pagination } from 'semantic-ui-react'
import CategoryLink from './CategoryLink';
import React from 'react';
import api from '../api';

class CategoryList extends React.Component {
    state = {
        items: null,
        activePage: 1,
        pageSize: 20,
        pending: false,
        totalPages: 9,
        viaProps: false,
    };

    getPage(activePage=1) {
        if (this.state.pending) {
            console.log('Already loading.  Skipping request');
            return null;
        }

        const skip = this.state.pageSize * (activePage - 1);

        if (this.props.categories) {
            // Get page from parent props, do not async load it.
            return this.setState({
                totalPages: Math.ceil(this.props.categories.length / this.state.pageSize),
                viaProps: true,
                items: this.props.categories.slice(skip, this.state.pageSize),
                activePage,
                pending: false,
            });
        }

        this.setState({ activePage, pending: true, items: null });

        return api.getCategories(skip, this.state.pageSize)
            .then(res => res.json())
            .then(items => {
                this.setState({ items });
            })
            .catch(err => {
                console.error('ZOMG', err);
            })
            .finally(() => this.setState({ pending: false }));
    }

    componentWillMount() {
        return this.getPage();
    }

    onPaginationChange = (event, data) => {
        console.log('pagination change', data.activePage);

        if (this.state.activePage !== data.activePage) {
            return this.getPage(data.activePage);
        }

        return null;
    };

    renderItems() {
        if (this.state.items) {
            if (this.state.items.length === 0) {
                return <p>Nothing to show!</p>;
            }

            return (
                <List className='CategoryList'>
                    {
                        this.state.items.map((c, i) =>
                            <List.Item key={i}>
                                <List.Content>
                                    <CategoryLink category={c}>{c}</CategoryLink>
                                </List.Content>
                            </List.Item>)
                    }
                </List>
            );
        }

        return <Loader />;
    }

    render() {
        return (
            <div className='CategoryList'>
                { this.state.totalPages > 1 ? <Pagination 
                    disabled={this.state.pending}
                    defaultActivePage={0}
                    boundaryRange={0}
                    ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                    firstItem={null}
                    lastItem={null}
                    // firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                    // lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                    // prevItem={{ content: <Icon name='angle left' />, icon: true }}
                    // nextItem={{ content: <Icon name='angle right' />, icon: true }}
                    onPageChange={this.onPaginationChange}
                    totalPages={this.state.totalPages}
                /> : '' }

                { this.renderItems() }
            </div>
        );
    }
}

export default CategoryList;