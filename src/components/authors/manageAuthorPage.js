'use strict';

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStores');
var toastr = require('toastr');
var Lifecycle = Router.Lifecycle;

var ManageAuthorPage = React.createClass({

    propTypes: {
        params: React.PropTypes.object
    },

    mixins: [
        Router.History,
        Lifecycle,
        Router.Navigation
    ],
    
    statics: {
        willTransitionFrom: function(transition, component) {
            if (component.state.dirty && !confirm('Leave without saving?')) {
                transition.abort();
            }
        }
    },

    getInitialState: function() {
        return {
            author: { id: '', firstName: '', lastName: '' },
            errors: {},
            dirty: false
        };
    },

    componentWillMount: function() {
        var authorId = this.props.params.id; //From the path '/author:id'
        if (authorId) {
            this.setState({author: AuthorStore.getAuthorById(authorId)});
        }
    },

    routerWillLeave: function() {
        if (this.state.dirty) {
            return 'Leave without saving?';
        }
    },

    setAuthorState: function(event) {
        this.setState({dirty: true});
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        return this.setState({author: this.state.author});
    },

    authorFormIsValid: function() {
        var formIsValid = true;
        this.state.errors = {}; // clear any previous errors

        if (this.state.author.firstName.length < 3) {
            this.state.errors.firstName = 'First name must be at least 3 characters.';
            formIsValid = false;
        }
        if (this.state.author.lastName.length < 3) {
            this.state.errors.lastName = 'Last name must be at least 3 characters.';
            formIsValid = false;
        }
        this.setState({errors: this.state.errors});
        return formIsValid;
        
    },
    
    
    saveAuthor: function(event) {
        event.preventDefault();
        if(!this.authorFormIsValid()) {
            return;
        }
        
        if (this.state.author.id) {
            AuthorActions.updateAuthor(this.state.author);
        } else {
        AuthorActions.createAuthor(this.state.author);
    }
        this.state.dirty = false;
        toastr.success('Author saved');
        this.history.pushState(null, 'authors');
    },
    
        render: function() {
        return (
            <AuthorForm
                author={this.state.author}
                onChange={this.setAuthorState}
                onSave={this.saveAuthor}
                errors={this.state.errors} />
        );
    }
});


module.exports = ManageAuthorPage;