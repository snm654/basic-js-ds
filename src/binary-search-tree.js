const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {

  constructor() {
    this.fuckingFuck = null;
  }

  root() {
    return this.fuckingFuck;
  }

  add(data) {
    this.fuckingFuck = addF(this.fuckingFuck, data);  //  корень будет равен (поддереву, значение) функции

    function addF(node, data) {

      // Если узла нет,  то добавить новый узел c передаваемым значением
      if (!node) return new Node(data);

      // Если после перемещения по дереву такой узел уже существует с одинаковым значением 
      // то вернуть ничего не делая
      if (node.data === data) return node;



      // Если значение меньше значения текущего узла 
      // то у этого узла левый потомок станет  равен значению функции
      // или же станет правым потомком
      (data < node.data)
        ? node.left = addF(node.left, data) : node.right = addF(node.right, data)

      return node;   // возврат модифицированного узла
    }
  }

  has(data) {
    function hasF(node, data) {

      // Если узла не оказалось, то false
      if (!node) return false;

      // Если такой элемент есть, то true
      if (node.data === data) return true;

      // поиск по потомкам
      return (data < node.data)
        ? hasF(node.left, data) : hasF(node.right, data);
    }

    return hasF(this.fuckingFuck, data);
  }

  find(data) {

    function findF(node, data) {

      // Если узла нет, то возврат null 
      if (!node) {
        return null;
      }

      // Если такой элемент есть, то возвращаем
      if (node.data === data) return node;


      // поиск по потомкам
      return (data < node.data)
        ? findF(node.left, data) : findF(node.right, data);
    }

    return findF(this.fuckingFuck, data);

  }

  remove(data) {
    function removeF(node, data) {

      // если узел отсутствует то возвращаем null
      if (!node) return null;


      // если значение меньше значения узла
      if (data < node.data) {
        // то идем в левый узел и удалим из поддерева значение и вызовом функции получим новое дерево
        // т.е c каждым шагом рекурсии получается новое дерево и присвается переменной node.left 
        node.left = removeF(node.left, data);
        return node;
      }

      if (node.data < data) {  // иначе в правый
        node.right = removeF(node.right, data);
        return node;
      } else {  // значение равно тому что в узле

        // если нет левого и правого поддерева(т.е не имеет потомков) и возвращает результат функции
        if (!node.left && !node.right) return null;


        // если нет левого потомка, то значит есть правый и поднимаем наверх
        if (!node.left) {
          node = node.right; // поднятие наверх
          return node;
        }


        // если нет правого потомка, то значит есть левый и поднимаем наверх
        else if (!node.right) {
          node = node.left // поднятие наверх
          return node;
        }

        else {
          let minFromRight = node.right; // равен корню правого поддерева
          while (minFromRight.left) {  // идем влево до конца (поиск самого маленького элемента)
            minFromRight = minFromRight.left; // сдвиг слево пока условие цикла соблюдается
          }

          // когда нашли минимальный элемент в правом поддереве
          // его значение присваивается удаляемому узлу
          node.data = minFromRight.data;

          // удаление  из правого поддерева  ,  минимального значения
          node.right = removeF(node.right, minFromRight.data)

          //  возврат модицифицированного узла
          return node;
        }
      }
    }
    // рут равен  результату функции
    this.fuckingFuck = removeF(this.fuckingFuck, data);  // в каком поддереве и с каким значением
  }


  min() {

    // если нет корня дерева то нечего возвращать
    if (!this.fuckingFuck) return null;


    // проходка по элементам
    let node = this.fuckingFuck;  // начало поиска с корня
    while (node.left) {  // проверка на есть ли кто-то слева
      node = node.left;  // если есть то присваиваем 
    }

    return node.data  // когда слева больше ничего нет, то цикл завершен и возвращается самый мелкий элемент
  }

  max() {
    // если нет корня дерева то нечего возвращать
    if (!this.fuckingFuck) {
      return  // возвращаем undefiend
    }

    let node = this.fuckingFuck // начало поиска с корня
    while (node.right) {  // проверка на есть ли кто-то справа
      node = node.right;   // если есть то присваиваем 
    }
    return node.data; // когда слева больше ничего нет, то цикл завершен и возвращается самый большой элемент
  }
}


module.exports = {
  BinarySearchTree
};