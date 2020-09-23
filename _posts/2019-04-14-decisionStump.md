---
layout: blog title: A Succinct Solution For Building Decision Stumps
description: Decision stumps are simple and good weak learners which could be
applied in Boosting algorithms. This blog provides both matlab code and python
for building decision stumps.
author: owenll66
---

# A Succinct Solution For Building Decision Stumps

## Background

I encountered this code when I was studying uni. The code logic was very
intriguing and I personally translated it in to python. It applies some
mathematics and may look scary to understand at the first sight. However, you
will find out the elegance of the code after you comprehend it.

## Why decision stump for boosting algorithms?
When it comes to boosting algorithms, we have to talk about weak learners. Weak
learners are algorithms in classification which can achieve slightly better than
50% accuracy. Boosting algorithms basically combine those weak learners and
train them by using training data to obtain the appropriate weights of each weak
learner, to produce a strong classifier with a high accuracy. A decision stump
is a decision tree with only one depth (Please refer to decision tree
algorithm). Due to it is a very simple weak learner and unlikely to occur
overfitting, it would be a safe option to choose as weak classifier and the
performance is usually good. Nonetheless, of course, you can choose other
classifiers as weak learners and test them out.

## What if the prediction accuracy is less than 50%
In binary case: Easy! Just need to flip the labels from one to another. As you
will see in the code.

## Matlab
```matlab
% build a stump from each component and return the best
function [stump] = build_stump(X,y,w)

d = size(X,2);
w = w/sum(w); % normalized the weights (if not already)

stump = cell(d,1);
werr = zeros(d,1);
for i=1:d,
  stump{i} = build_onedim_stump(X(:,i),y,w);
  stump{i}.ind = i;
  werr(i) = stump{i}.werr;
end;

[min_werr,ind] = min(werr);

stump = stump{ind(1)}; % return the best stump


% build a stump from a single input component

function [stump] = build_onedim_stump(x,y,w)

[xsorted,I] = sort(x); % ascending
Ir = I(end:-1:1); % descending

score_left  = cumsum(w(I).*y(I)); % left to right sums
score_right = cumsum(w(Ir).*y(Ir));  % right to left sums

% score the -1 -> 1 boundary between successive points
score = -score_left(1:end-1) + score_right(end-1:-1:1);

% find distinguishable points (possible boundary locations)

Idec = find( xsorted(1:end-1)<xsorted(2:end) );

% locate the boundary or give up

if (length(Idec)>0),
  [maxscore,ind] = max( abs(score(Idec)) ); % maximum weighted agreement
  ind = Idec(ind(1));

  stump.werr = 0.5-0.5*maxscore; % weighted error
  stump.x0   = (xsorted(ind)+xsorted(ind+1))/2; % threshold
  stump.s    = sign(score(ind)); % direction of -1 -> 1 change
else
  stump.werr = 0.5;
  stump.x0   = 0;
  stump.s    = 1;
end;
```
## Core idea
```matlab
score_left  = cumsum(w(I).*y(I)); % left to right sums
score_right = cumsum(w(Ir).*y(Ir));  % right to left sums

% score the -1 -> 1 boundary between successive points
score = -score_left(1:end-1) + score_right(end-1:-1:1);
```

Explanation: "score_left" sums up all the weighted labels on the left of all the
possible splits and "score_right" sums up all the weighted labels on the right
of all the possible splits. And "score" is an array of "information gain"
calculated for each split. Using "score" we can find the highest "information
gain" which splits the data in order to have one type of weighted label ("+" or
"-") value as higher as possible on each side.

## Python3
Here is the code with the same logic that I translated into Python
```python
#tree stump
class Stump:
    def __init__(self, weighted_error, split, dimension, sign):
        self.weighted_error = weighted_error
        self.split = split
        self.dimension = dimension
        self.sign = sign

#####################################################################
#Build the Decision Tree Stump
#INPUT:    X_train -- the training features
#          y_train -- the training labels
#          w -- weight of each sample
#OUTPUT:   dtStump[index] -- the best split stump
#####################################################################
def build_DTStump(X_train, y_train):
    dimension = X_train.shape[1]
    dtStumps = []
    weighted_error = np.zeros(dimension)
    #initialise decision tree stumps for each dimension
    for i in range(dimension):
        dtStumps.append(build_onedim_stump(X_train[:,i],y_train))
        dtStumps[i].dimension = i
        weighted_error[i] = dtStumps[i].weighted_error
    index = np.argmin(weighted_error)
    return dtStumps[index]

#####################################################################
#Build one dimensional Decision Tree Stump
#INPUT:    X_train -- the training features
#          y_train -- the training labels
#          w -- weight of each sample
#OUTPUT:   stump -- the best split stump in this dimension
#####################################################################
def build_onedim_stump(x,y):
    stump = Stump(None,None,None,None)

    sortedx = np.sort(x, axis = 0)
    #indices in ascending order
    I = (np.argsort(x, axis = 0)).reshape(len(x))
    #indices in descending order
    Ir = np.flip(I, axis = 0)
    #left to right sums
    score_left = np.cumsum(y[I])
    #right to left sums
    score_right = np.cumsum(y[Ir])

    score = -score_left[:-1] + (np.flip(score_right, axis = 0))[1:]

    indices = np.argwhere(sortedx[:-1] < sortedx[1:])[:,0]

    #locate the boundary
    if(len(indices) > 0):
        maxscore = np.max(abs(score[indices]))
        index = np.argmax(abs(score[indices]))
        index  = indices[index]

        stump.weighted_error = 0.5 - 0.5*maxscore
        #get the split value
        stump.split = (sortedx[index]+sortedx[index+1])/2
        stump.sign = np.sign(score[index])
    else:
        stump.weighted_error = 0.5
        stump.split = 0
        stump.sign = 1
    return stump
```
## Discussion
If using decision stump as weak learner, will the classifier still overfit?<br>
The answer is YES! This blog is not going to talk about the mathematical
mechanism behind this. But it is proven that if there are too many iterations on
training, overfitting will still occur. <br>

Please leave a comment if you have any questions or insights about this blog. Or
if you would like to help construct this website, please Email
_bowen.liu_owen@qq.com_.

<br>

***
