

input = open('schema.xml', 'r')

data = input.read()


if "\r" not in data:
	output = open('schema.xml', 'w')
	for line in data.split(">"):
		if line is not "":
			output.write(line + str(">\r"))
		else:
			output.write(str("\r"))
	output.close()
else:
	print("There are already newlines in this file")

input.close()