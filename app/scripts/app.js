'use strict';

angular.module('42StackApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'ngAnimate',
	'ngTagsInput',
	'monospaced.elastic',
	'ngMockE2E'
])
.config(function ($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/main',
		controller : 'MainCtrl'
	})
	.when('/users', {
		templateUrl: 'partials/users',
		controller: 'UsersCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});

	$locationProvider.html5Mode(true);
});

angular.module('42StackApp').controller('AppCtrl', function ($scope, $location, $httpBackend) {

	$scope.$on('$routeChangeStart', function () {
		$scope.$broadcast('loading');
	});

	$scope.$on('$routeChangeSuccess', function () {
		$scope.$broadcast('loadingStop');
		$scope.newLocation = $location.path();
	});

	$scope.$on('$routeChangeError', function (event, current, previous, rejection) {
		console.log('ROUTE CHANGE ERROR: ' + rejection);
	});

	$httpBackend.whenGET(/partials\/.*/).passThrough();
	$httpBackend.whenGET(/directives\/.*/).passThrough();

	$httpBackend.whenGET(/api\/questions/).respond([
		{ 'id' : 1, 'title' : 'Comment passer d\'emacs a vim ?', 'author' : 1, 'content' : 'My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?My coworkers don\'t want to delete that poor program, How can I do to convince them ?', 'category' : 'UNIX', 'timestamp' : 'hh:mm dd/MM/YY', 'upvotes' : 199, 'downvotes' : 0, 'tags' : [{ 'id' : 0 }, { 'id' : 1 }, { 'id' : 2 }, { 'id' : 3 }, { 'id' : 4 }], 'comments' : [{ 'id' : 1, 'content' : 'Mé t trau 1 noube le maieure c sublim taixte !', 'author' : 3, 'upvotes' : 0, 'downvotes' : 100, 'timestamp' : 'hh:mm dd/MM/YY' }, { 'id' : 2, 'content' : 'Aperçu closed account 3.', 'author' : 1 , 'upvotes' : 1000, 'downvotes' : 0, 'timestamp' : 'hh:mm dd/MM/YY' }, {'id' : 3, 'content' : 'Thanks a lot my friend.', 'author' : 2, 'upvotes' : 100, 'downvotes' : 0, 'timestamp' : 'hh:mm dd/MM/YY' }] },
		{ 'id' : 2, 'title' : 'Si t\'as pas push push swap', 'author' : 2, 'content' : 'Just want to know, because vim is better after all.', 'category' : 'ALGO', 'timestamp' : 'hh:mm dd/MM/YY', 'upvotes' : 100, 'downvotes' : 0, 'tags' : [{ 'id' : 1 }], 'comments' : [] },
		{ 'id' : 3, 'title' : 'bim bimbim', 'author' : 2, 'content' : 'Just want to know, because vim is better after all.', 'category' : 'UNIX', 'timestamp' : 'hh:mm dd/MM/YY', 'upvotes' : 100, 'downvotes' : 0, 'tags' : [{ 'id' : 1 }], 'comments' : [] },
		{ 'id' : 4, 'title' : 'Comment passer d\'emacs a vim ?', 'author' : 1, 'content' : 'My coworkers don\'t want to delete that poor program, How can I do to convince them ?', 'category' : 'UNIX', 'timestamp' : 'hh:mm dd/MM/YY', 'upvotes' : 199, 'downvotes' : 0, 'tags' : [{ 'id' : 1 }, { 'id' : 2 }, { 'id' : 0 }], 'comments' : [{ 'id' : 1, 'content' : 'Mé t trau 1 noube le maieure c sublim taixte !', 'author' : 3, 'upvotes' : 0, 'downvotes' : 100, 'timestamp' : 'hh:mm dd/MM/YY' }, { 'id' : 2, 'content' : 'Aperçu closed account 3.', 'author' : 1 , 'upvotes' : 1000, 'downvotes' : 0, 'timestamp' : 'hh:mm dd/MM/YY' }, {'id' : 3, 'content' : 'Thanks a lot my friend.', 'author' : 2, 'upvotes' : 100, 'downvotes' : 0, 'timestamp' : 'hh:mm dd/MM/YY' }] },
		{ 'id' : 5, 'title' : 'Si t\'as pas push push swap', 'author' : 2, 'content' : 'Just want to know, because vim is better after all.', 'category' : 'ALGO', 'timestamp' : 'hh:mm dd/MM/YY', 'upvotes' : 100, 'downvotes' : 0, 'tags' : [{ 'id' : 1 }], 'comments' : [] },
		{ 'id' : 6, 'title' : 'bim bimbim', 'author' : 2, 'content' : 'Just want to know, because vim is better after all.', 'category' : 'UNIX', 'timestamp' : 'hh:mm dd/MM/YY', 'upvotes' : 100, 'downvotes' : 0, 'tags' : [{ 'id' : 1 }], 'comments' : [] },
		{ 'id' : 7, 'title' : 'Comment passer d\'emacs a vim ?', 'author' : 1, 'content' : 'My coworkers don\'t want to delete that poor program, How can I do to convince them ?', 'category' : 'UNIX', 'timestamp' : 'hh:mm dd/MM/YY', 'upvotes' : 199, 'downvotes' : 0, 'tags' : [{ 'id' : 1 }, { 'id' : 2 }, { 'id' : 0 }], 'comments' : [{ 'id' : 1, 'content' : 'Mé t trau 1 noube le maieure c sublim taixte !', 'author' : 3, 'upvotes' : 0, 'downvotes' : 100, 'timestamp' : 'hh:mm dd/MM/YY' }, { 'id' : 2, 'content' : 'Aperçu closed account 3.', 'author' : 1 , 'upvotes' : 1000, 'downvotes' : 0, 'timestamp' : 'hh:mm dd/MM/YY' }, {'id' : 3, 'content' : 'Thanks a lot my friend.', 'author' : 2, 'upvotes' : 100, 'downvotes' : 0, 'timestamp' : 'hh:mm dd/MM/YY' }] },
		{ 'id' : 8, 'title' : 'Si t\'as pas push push swap', 'author' : 2, 'content' : 'Just want to know, because vim is better after all.', 'category' : 'CONFIG', 'timestamp' : 'hh:mm dd/MM/YY', 'upvotes' : 100, 'downvotes' : 0, 'tags' : [{ 'id' : 1 }], 'comments' : [] },
		{ 'id' : 9, 'title' : 'bim bimbim', 'author' : 2, 'content' : 'Just want to know, because vim is better after all.', 'category' : 'UNIX', 'timestamp' : 'hh:mm dd/MM/YY', 'upvotes' : 100, 'downvotes' : 0, 'tags' : [{ 'id' : 1 }], 'comments' : [] },
		{ 'id' : 10, 'title' : 'Comment passer d\'emacs a vim ?', 'author' : 1, 'content' : 'My coworkers don\'t want to delete that poor program, How can I do to convince them ?', 'category' : 'UNIX', 'timestamp' : 'hh:mm dd/MM/YY', 'upvotes' : 199, 'downvotes' : 0, 'tags' : [{ 'id' : 1 }, { 'id' : 2 }, { 'id' : 0 }], 'comments' : [{ 'id' : 1, 'content' : 'Mé t trau 1 noube le maieure c sublim taixte !', 'author' : 3, 'upvotes' : 0, 'downvotes' : 100, 'timestamp' : 'hh:mm dd/MM/YY' }, { 'id' : 2, 'content' : 'Aperçu closed account 3.', 'author' : 1 , 'upvotes' : 1000, 'downvotes' : 0, 'timestamp' : 'hh:mm dd/MM/YY' }, {'id' : 3, 'content' : 'Thanks a lot my friend.', 'author' : 2, 'upvotes' : 100, 'downvotes' : 0, 'timestamp' : 'hh:mm dd/MM/YY' }] },
		{ 'id' : 11, 'title' : 'Si t\'as pas push push swap', 'author' : 2, 'content' : 'Just want to know, because vim is better after all.', 'category' : 'UNIX', 'timestamp' : 'hh:mm dd/MM/YY', 'upvotes' : 100, 'downvotes' : 0, 'tags' : [{ 'id' : 1 }], 'comments' : [] },
		{ 'id' : 12, 'title' : 'bim bimbim', 'author' : 2, 'content' : 'Just want to know, because vim is better after all.', 'category' : 'UNIX', 'timestamp' : 'hh:mm dd/MM/YY', 'upvotes' : 100, 'downvotes' : 0, 'tags' : [{ 'id' : 1 }], 'comments' : [] }
	]);

	$httpBackend.whenGET(/api\/tags/).respond([
		{ 'id' : 0, 'name' : 'C', 'description' : 'General-purpose computer programming language.' },
		{ 'id' : 1, 'name' : 'Configuration', 'description' : 'Tips and HOWTOs for a perfect config' },
		{ 'id' : 3, 'name' : 'JavaScript', 'description' : 'Dynamic, object-oriented and prototype-based language.' },
		{ 'id' : 2, 'name' : 'jQuery', 'description' : 'A cross-browser JavaScript library.' },
		{ 'id' : 4, 'name' : 'HTML', 'description' : 'Markup language for creating web pages.' },
		{ 'id' : 5, 'name' : 'CSS', 'description' : 'Control the visual presentation of documents written in a markup language.' }
	]);

	$httpBackend.whenGET(/api\/users/).respond([
		{ 'id' : 1, 'name' : 'aperçu', 'email' : 'bgronon@zavatta.fr', 'image' : 'apercu.jpg', 'message' : 'none', 'reputation' : 1, 'upvotes' : 10, 'downvotes' : 10, 'tags' : [{ 'id' : 1, 'count' : 1 }, {'id' : 2, 'count' : 1 }, {'id' : 3, 'count' : 1}], 'banned' : false, 'joined' : '01/01/1970 00:00' },
		{ 'id' : 2, 'name' : 'dawuut', 'email' : 'dawuut@zavatta.fr', 'image' : 'dawuut.png', 'message' : 'okay', 'reputation' : 1, 'upvotes' : 10, 'downvotes' : 10, 'tags' : [{}], 'banned' : false, 'joined' : '01/01/1970 00:00' },
		{ 'id' : 3, 'name' : 'gongon', 'email' : 'admin@shitter.fr', 'image' : 'gongon.png', 'message' : 'situpushpaspushswap', 'reputation' : -200, 'upvotes' : 0, 'downvotes' : 0, 'tags' : [{}], 'banned' : true, 'joined' : '14/01/2014 12:12' }
	]);

});
