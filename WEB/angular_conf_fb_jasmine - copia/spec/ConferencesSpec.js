/* Prueba de Conferencias */

describe ("the app should", function() {

  // Inicialización de cada prueba
  // =============================
  
  var mainServices;
  var conferencesController, conferencesScope;
  var loginController, loginScope;
  
  beforeEach(function() {
    
    // app : conferencesApp
    module('conferencesApp');
    
    // servicio : mainServices
    inject(function($injector){
      mainServices = $injector.get('mainServices');
    });

    inject(function($rootScope, $controller, mainServices){
      conferencesScope = $rootScope.$new();
      conferencesController = $controller('conferencesController', { $scope:conferencesScope});
    });

    inject(function($rootScope, $controller, mainServices){
      loginScope = $rootScope.$new();
      loginController = $controller('loginController', { $scope:loginScope});
    });
    
  });


  // Pruebas
  // =======
  
  it('be able to deny a login attempt', function(){
    expect(mainServices.validateLogin('jjrg1994', 'jjrg199')).toBe(false);
  });

  it('be able to logout', function(){
    mainServices.logout();
    expect(mainServices.isLogged()).toBe(false);

  });

  it('be able to login successfully', function(){
    expect(mainServices.validateLogin('jjrg1994', 'jjrg1994')).toBe(true);
    expect(mainServices.isLogged()).toBe(true);
    expect(mainServices.getCurrentUser()).toBe('jjrg1994'); 
  });

  it('be able to login from a controller', function(){
    loginScope.login = 'asd';
    loginScope.password = 'asd';
    loginScope.validateLogin();
    expect(mainServices.isLogged()).toBe(true);
    expect(mainServices.getCurrentUser()).toBe('asd');
  });

  it('be able to load conferences', function(){
    expect(conferencesScope.conferences).toBeDefined();
  });

  it('be able to load comments', function(){
    expect(conferencesScope.comments).toBeDefined();
  });
  
});
