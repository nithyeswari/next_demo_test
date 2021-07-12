///<reference types="cypress"/>
describe ('Test urls',()=>{
 it('Test availability of client url', () => {
        cy.visit("http://localhost:3000");
         cy.contains('a', 'Search profiles →').click();
    });
     it('Test Availability of server url', () => {
        cy.visit("http://localhost:4000/graphql")
    });
});
describe('Test Profile search', () => { 
    beforeEach(()=>{ 
        cy.visit("http://localhost:3000/profiles");  
        cy.get('[data-cy=profile]').as('profiles')
    });
    it('Test search, load more profile visible and check 20 profiles preloaded', () => { 
        cy.contains('Search profile'); 
        cy.contains('Load more profiles') ;
        cy.get('@profiles').should('have.length',20);
    }); 
    it('Click load more and verify it loads 20 more profile data',()=>{ 
        cy.contains('Load more profiles').click();
        cy.get('@profiles').should('have.length',40);
    });
    it('Type name in Search profile, verify profiles with name are loaded',()=>{
        let value = cy.get('@profiles'). first().then((profile)=>{
            let content =profile[0].textContent;
            cy.get('[data-cy=name]').type(content.trim()); 
            cy.get('@profiles').should('have.length',1);
        });
    });

})