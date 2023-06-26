from typing import Any


class Node:
    def __init__(self,val):
        self.val = val
        self.left = None
        self.right = None

    def __repr__(self) -> str:
        return f"Node({self.val}), left: {self.left}, right: {self.right}"

class Solution:
    def numOfWays(self, nums) -> int:
        # first construct the original bst
        root = Node(nums[0])   
        tmp = root     
        def constructBST(root,node):
            if not root:
                return node

            if node.val < root.val:
                root.left = constructBST(root.left,node)

            else:
                root.right = constructBST(root.right,node)
                
            return root

        for num in nums[1:]:
            constructBST(root,Node(num))

        # now we find the number of ways to swap
        def findWays(root,num):
            count = 0

            if not root:
                return count

            if root.left:
                count *= findWays(root.left,num)
            
            if root.right:
                count *= findWays(root.right,num)

            return count

            

        
        
s = Solution()
print(s.numOfWays([3,4,5,1,2]))