---
layout: blog
title: Brief introduction about Lambda expression in Java
description: Lambda expression was introduced in Java in 2014 which enables functional programming on streams of elements. It is a really cool feature which simplifies the code if you are using the recommend version by Oracle (java 1.8).

author: owenll66
---

# Brief introduction about Lambda expression in Java

## Why lambda expression

Lambdas introduces functional programming to Java which is known as an Object Oriented Programming language. One of the benefits of using Lambdas is that it makes code simpler and easy to understand. In addition, Java 1.8 provides easy-to-use lambda APIs and libraries which also supports parallel processing.

## Values vs Functions

### Define Lambda expressions

Lambda enables assigning a block of code to a variable. Normally, a function needs to specify its scope, return type and function name. However, when you assign a code block using lambda expression, neither of these are needed.  
For example:
```java
/* single line lambda expression does not need curly braces
* lambda expression works the same way as implementing a class
* lambda expression only implements a function rather than a class
* */
HelloWorld lambdaHelloWorld = ()->System.out.println("Hello World from lambda expression");
//hello world from lambda ex
//hello world from lambda expression
lambdaHelloWorld.greet();

//override the interface method
HelloWorld instance = new HelloWorld() {        
    @Override
    public void greet() {
        System.out.println("Hello World from Overriding");
    }
};
instance.greet();


/* Functional interface: an interface only have one abstract method
* @FunctionalInterface annotation force an interface only have one abstract method
* For the sake of lambda expression*/
@FunctionalInterface
interface HelloWorld {
    void greet();
    default void hi() {
        System.out.println("hi");
    }
}
```
From the code above, the lambda expression works the same as implementing an interface, but the code is much simpler.

The syntax of lambdas work as:  
( "arguments" ) -> { "statements" };

__NOTE:__  
if there is only one argument, we can eliminate the parentheses.  
For example: p -> {System.out.println(p);};  

if there is only statement, we can eliminate the curly braces.  
For example: p -> System.out.println(p);

### Pass lambda expressions as arguments

You can also pass a lambda expression as an argument to a function.  
For example:  
```java
passLambda(()->System.out.println("Pass lambda expression as an argument"));

public void passLambda(HelloWorld helloWorld) {
    helloWorld.greet();
}

@FunctionalInterface
interface HelloWorld {
    void greet();
    default void hi() {
        System.out.println("hi");
    }
}
```
This code passes a lambda expression to the function "passLambda" which takes an argument of an instance of HelloWorld interface. This works same as passing an implementated instance of the interface HelloWorld.  


## Method reference

The syntax of a method reference works as: "method class" :: "method name".  
For example:

```java
Thread thread = new Thread(()->printMessage1());
thread.start();

//Same as using method reference
Thread thread1 = new Thread(Main::printMessage1);//Same as ()->printMessage1()
thread1.start();


printMessage2("Hello", p -> System.out.println(p));

//Method reference takes an argument and pass it to the System.out.println function
printMessage2("Hello", System.out::println);//Same as p -> System.out.println(p)

public static void printMessage1() {
    System.out.println("Hello World");
}

public static void printMessage2(String s, Consumer<String> consumer) {
    consumer.accept(s);
}
```
__NOTE:__ New thread constructor takes a runnable instance. Runnable is a functional interface which could be implemented by lambda expression.

## Sort collections

```java
List<Box> boxes = Arrays.asList(
    new Box("box1",1,1,1),
    new Box("abc",2,2,2),
    new Box("abd",3,3,3),
    new Box("bbd",4,4,4),
    new Box("efg",5,5,5)
);

System.out.println("Sort by lambda expression descendingly");
//sort the List according to the box name -- descending order
Collections.sort(boxes, ((box1, box2)->box2.getName().compareTo(box1.getName()) ));

//"forEach" take an argument which is the Consumer type
boxes.forEach(System.out::println);
```
__NOTE:__ Consumer interface is a functional interface provided by "java.util.function" which has one abstract void  function "accept" which takes a generic type argument.

## Filters

```java
boxes.parallelStream()
    .filter(p->p.getName().startsWith("b"))
    .filter(p->p.getHeight()>2)
    .forEach(System.out::println);
```


This blog only covers a few common uses of Lambda expressions. For full version of Lambda expression examples, please checkout: https://github.com/Owenll66/JavaLambdaExample  

Please leave a comment if you have any questions or suggestions.

<br>

***
