import random
import numpy as np


def splitBag(bag, num_of_bags):
    print('inside split bag')


if __name__=="__main__":

    list = ['a', 'b', 'c', 'd', 'e', 'f']
    random.shuffle(list)
    split_list = np.array_split(list,4)
    print(list)
    print(split_list)
    print(split_list[0])
