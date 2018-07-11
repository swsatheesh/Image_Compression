import React from 'react';

export const NavBarContainer = () => (
    <nav class="navbar navbar-default">
        <div class="container">
            <div class="navbar-header">
                <button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a href="#" class="navbar-brand">Image Compression</a>
            </div>
            <div id="navbarCollapse" class="collapse navbar-collapse" />
        </div>
    </nav>
);

export default NavBarContainer;