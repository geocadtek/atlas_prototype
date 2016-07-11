(function () {
    'use strict';

    angular
        .module('atlasDetail')
        .factory('geojsonCenter', geojsonCenterFactory);

    geojsonCenterFactory.$inject = [];

    function geojsonCenterFactory () {
        return {
            getCenter: getCenter
        };

        function getCenter(location) {
            var x = [],
                xMin,
                xMax,
                xCenter,
                y = [],
                yMin,
                yMax,
                yCenter,
                locationLength;

            locationLength = location[0].length;

            for(var i=0 ; i<locationLength; i++){
                y.push(location[0][i][0]);
                x.push(location[0][i][1]);
            }
            console.log('x', x);

            xMin = getMin(x);
            xMax = getMax(x);
            yMin = getMin(y);
            yMax = getMax(y);

            console.log('xmin', yMin);
            console.log('xmax',yMax);

            xCenter = xMin + ((xMax - xMin) / 2);
            yCenter = yMin + ((yMax - yMin) / 2);

            console.log(yCenter);

            return [xCenter, yCenter];
        }

        function getMin(array){
            var min;
            min = array.reduce(function(previous,current){
                return previous < current ? previous:current;
            });
            return min;
        }

        function getMax(array) {
            var max;
            max = array.reduce(function(previous,current){
                return previous > current ? previous:current;
            });
            return max;
        }

    }
})();