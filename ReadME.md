##### CodingAccessment

#### Assignment
# download project
$ git clone https://github.com/thazinphyoit/CodingAccessment.git

=> move to the project root directory

# install package
$ yarn add --dev @types/babel__generator@^7.6.4
$ yarn add --dev @types/babel__traverse@^7.18.3
$ yarn add --dev @types/express@^4.17.15
$ yarn add --dev @types/node@^18.11.18
$ yarn add --dev @types/prettier@^2.7.2
$ yarn add @babel/traverse@^7.20.10
$ yarn add express@^4.18.2
$ yarn add prettier@^2.8.1

# run project
$ yarn start

# Edge Cases
1. Template literals without the `/*tsx*/` comment should not be linted.
2. Template literals that are nested inside other expressions or statements should be handled correctly.
3. Comments that are not leading but trailing or inner should not lead to linting of the template literal.
4. Overlapping or adjacent template literals should be handled without linting the wrong parts of code.

# Time and Space Complexity
The time complexity of parsing and traversing the AST is generally O(n), where n is the number of nodes in the AST, because each node is visited once. However, linting can be considered as O(m * k), where m is the number of `/*tsx*/` template literals and k is the average time complexity of the linting operation, which is dependent on the implementation of Prettier.
The space complexity is also O(n), primarily because of the storage required for the AST.
It is important to remember that while the complexities can give a general idea, the actual performance will highly depend on the specific input code and the efficiency of the Prettier linting operation.


#### Additional Questions
https://docs.google.com/document/d/1Bia0AAYu1lBHhYX6OSQl1bvJYnt4R-gcxpAZytdNDRY/edit?usp=sharing




