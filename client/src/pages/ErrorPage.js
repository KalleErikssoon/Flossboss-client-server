import React from 'react'

function ErrorPage() {
    
    return (
    <div>
        <b-container fluid class="vh-100 d-flex justify-content-center align-items-center bg-blue">
            <b-row>
               <b-col>
                <b-card class="bg-transparent border-0">
                    <b-card-text>
                        <h1>Server Error</h1>
                        <p>Sorry, we're experiencing some issues. Please try again later.</p>
                    </b-card-text>
                </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
    )
}
export default ErrorPage;