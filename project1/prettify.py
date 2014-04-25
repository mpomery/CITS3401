input = open('schema.xml', 'r')
data = input.read()
if "\r" not in data:
	output = open('schema.xml', 'w')
	for line in data.split(">"):
		if line is not "":
			output.write(line + str(">\n"))
		else:
			output.write(str("\n"))
	output.close()
else:
	print("There are already newlines in this file")

input.close()