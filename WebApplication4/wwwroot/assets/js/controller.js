(function () {
    'use strict';

    angular
        .module('app')
        .controller('cadastrocontroller', function controller($scope) {
            $scope.title = 'controller';

            activate();

            function activate() { }
        })
        .controller('registrocontroller', function controller($scope) {
            $scope.title = 'controller';

            activate();

            function activate() { }
        });
        ;

    controller.$inject = ['$scope'];

    function controller($scope) {
        $scope.title = 'controller';

        activate();

        function activate() { }
    }
})();
