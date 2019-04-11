---
layout: blog
---

# A succinct solution for building decision stumps

## Background

I encountered this code when I was studying in the university on a machine learning course. I was intrigued by the succinct and concise code which was provided by my professor. It applies some mathematics and may look scary to understand at the first sight. However, you will find out the elegance of the code after you understand it.

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



## Python
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
#OUTPUT:   dtStump -- the best split stump in this dimension
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
***
<br>
