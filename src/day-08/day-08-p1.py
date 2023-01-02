import numpy as np

with open("./example.txt", "r") as fin:
    lines = fin.read().strip().split()

# if we're dealing with 3 dimensional arrays, we should use numpy
# print(lines)
grid = [list(map(int, list(line))) for line in lines]
# print(grid)

height = len(grid)
width = len(grid[0])

grid = np.array(grid)
print(grid)

ans = 0
for x in range(width):
    for y in range(height):
        position = grid[x, y]
        # left line or (all values before the current position but not including the current position)
        # print(grid[y, :x])
        # print(grid[y, (x+1):])
        # print(grid[:y, x])
        # print(grid[(y+1):, x])
        if x == 0 or np.amax(grid[y, :x]) < position:
            ans += 1

        # right line or (all values after the current position but not including the current position)
        elif x == width - 1 or np.amax(grid[y, (x+1):]) < position:
            ans += 1

        # top line or (all values on top of the current position but not including the current position)
        elif y == 0 or np.amax(grid[:y, x]) < position:
            ans += 1

        # bottom line or (all values under of the current position but not including the current position)
        elif y == height - 1 or np.amax(grid[(y+1):, x]) < position:
            ans += 1

print(ans)
