---
layout: blog

title: What is OutOfMemory exception? How to identify them? How to avoid?

description: OutOfMemory exception is one of the most head-scratching problem to identify when debugging a software. This blog will discuss what OutOfMemory exception is and some typical symptoms of it and what the possible causes are.

author: owenll66
---

# What is OutOfMemory exception? How to identify them? How to avoid?

## Background

I was assigned to address this the 

## What is OutOfMemory?

OutOfMemoryException will be thrown when there is not enough chuck of memory for the program to allocate. And the stack traces sometime can be not very helpful as the location of the exception is thrown could be anywhere the program tries to allocate memory while there is not enough.

**The causes of this type of exception can be summarised as below:**

* the software itself it is very memory consuming. In this scenario, we cannot do much from the software side but to upgrade the hardware.

* There is potential memory leaks in the software. The symptom is usually that as we start up the program, the performance of the software will drop overtime as we usually refer to the software is slow. If restarting the software the performance will come back and then again decrease overtime.

* Low memory performance due to poorly coded algorithms in the software.  

**To identify the causes of OutOfMemory exception, here are two things we can do:**

* Memory profiling and take snapshots - There is a few memory profiling tools in the market such as dotMemory, Ants Memory Profiler or .Net Memory Profiler which could help to locate the memory issue. By observing the memory usage graph and comparing the memory snapshots, we can see which type of objects are increasing overtime then we need to think the question "Does our system need this many objects?"

* Collecting stack traces – even though the stack traces sometimes are not directly related to the real problem. But by collecting many of them could be helpful to identifying the places which are aggressively allocating memory.

**Symptoms and Analysis:**

* If the memory of the software is properly managed, the memory will grow as the software starts up in the beginning. It may have some small fluctuations, but then the overall memory usage will remain stable at around a certain value. It may go up or down if user performs some operations but the memory won't continue increasing overtime.

![OOM1](https://www.owenll66.com/blog-res/blog-OOM/OOM1.png)

* If the memory keeps increasing, it is very likely there are memory leaks in the system. Eventually it will crash at a certain point. As a programmer, be aware of these spots which running at the back ground to update or remove the data. The unmanaged objects to be updated or removed must be disposed/released explicitly in code. Otherwise they will remain in the memory.

![OOM2](https://www.owenll66.com/blog-res/blog-OOM/OOM1.png)

* Here is another leaking scenario which requires user's operations. For example, it a user open a window and close it multiple times. Every time the window is closed the resource should be released. If not, the memory graph will look like below. Each red point indicates the user click on the open window button. In this case, to locate the problem would not be too hard. Review the code that closes the window and release the data once not using.

![OOM3](https://www.owenll66.com/blog-res/blog-OOM/OOM1.png)

* In this graph below, the memory graph starts spiking at a certain point. This is likely to be the  memory consuming algorithms running at the background continue requesting large chucks of memory. The drops indicate that the Garbage collector can sense memory pressure and comes in to free up some memory. But the collecting speed cannot catch up the memory allocating speed. In the end, the software will crash with the out of memory issue. In this scenario, the exception stack traces should indicate the areas where the memory consuming code is running. Optimise the algorithms and avoid inefficient database queries.

![OOM4](https://www.owenll66.com/blog-res/blog-OOM/OOM1.png)

Reference: [OutOfMemoryException in C#](https://docs.microsoft.com/en-us/dotnet/api/system.outofmemoryexception?view=net-5.0#:%7E:text=An%20OutOfMemoryException%20exception%20has%20two,to%20successfully%20perform%20an%20operation. "OutOfMemoryException Class").

<br>

***
