'use strict';

angular.module('42StackApp').controller('AskCtrl', function ($scope) {

	$scope.questiontitle = 'Example de titre';

	$scope.content = '## Titre ##\n\nVous pouvez poser votre question ici, en utilisant la markup suivante:\nCeci est un **texte en gras** mais ceci est un *texte en italique*, voici un [lien][1].\n\nSous-titre\n=======\n\n1. Un premier élément\n2. Un second\n3. Et ainsi de suite\n\n----------\n\n- Je\n- Ne\n- Suis\n- Pas\n- Ordonnée\n\n> Une citation\n\n----------\n\n    int main(void)\n    {\n        ft_putstr("Enfin, du code.");\n        return(0);\n    }\n\nQui peut aussi être inline : `ft_putstr("Comme ceci.");`\n\n   [1]: http://google.fr';

	$scope.categories = [
		['UNIX', 'Environnement UNIX'],
		['ALGO', 'Algorithmie'],
		['INFOG', 'Infographie']
	];
	$scope.taglist = [];

});
