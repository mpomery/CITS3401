import string

input = open("generateddata.csv", "r")

years = []
quarters = []
people = []
states = []
clinics = []
tests = []
diseases = []
specialists = []
time = []
cost = []

datacount = 0;

for line in input:
	datacount += 1
	data = string.split(line, ",")
	for i in range(len(data)):
		data[i] = string.strip(data[i])
		if data[i] == "":
			data[i] = "none"
	if data[0] not in years:
		years.append(data[0])
	if data[1] not in quarters:
		quarters.append(data[1])
	if data[2] not in people:
		people.append(data[2])
	if data[3] not in states:
		states.append(data[3])
	if data[4] not in clinics:
		clinics.append(data[4])
	if data[5] not in tests:
		tests.append(data[5])
	if data[6] not in diseases:
		diseases.append(data[6])
	if data[7] not in specialists:
		specialists.append(data[7])
	if int(data[8]) not in time:
		time.append(int(data[8]))
	if int(data[9]) not in cost:
		cost.append(int(data[9]))
	#print str(line)
	#print str(data)
input.close()


years.sort()
quarters.sort()
people.sort()
states.sort()
clinics.sort()
tests.sort()
diseases.sort()
specialists.sort()
time.sort()
cost.sort()

print "Data Points\t" + str(datacount)
print "years\t " + str(years)
print "quarters\t " + str(quarters)
print "people\t " + str(people)
print "states\t " + str(states)
print "clinics\t " + str(clinics)
print "tests\t " + str(tests)
print "diseases\t " + str(diseases)
print "specialists\t " + str(specialists)
print "time\t " + str(time)
print "cost\t " + str(cost)
print ""
print ""
print "analysing [row] and [col]"
print "filtered too"
print ""


print "No Filters"
print string.join(years,"|")
print string.join(quarters,"\n")
table = [[0 for i in range(len(years))] for i in range(len(quarters))]
input = open("generateddata.csv", "r")
for line in input:
	data = string.split(line, ",")
	for i in range(len(data)):
		data[i] = string.strip(data[i])
		if data[i] == "":
			data[i] = "none"
	table[quarters.index(data[1])][years.index(data[0])] += 1
print string.replace(str(table), "], ", "]\n ")
input.close()


print ""
print "Breakdown By State"
print string.join(years,"|")
print string.join(quarters,"\n")
for state in states:
	print state
	table = [[0 for i in range(len(years))] for i in range(len(quarters))]
	input = open("generateddata.csv", "r")
	for line in input:
		data = string.split(line, ",")
		for i in range(len(data)):
			data[i] = string.strip(data[i])
			if data[i] == "":
				data[i] = "none"
		if data[3] == state:
			table[quarters.index(data[1])][years.index(data[0])] += 1
	print string.replace(str(table), "], ", "]\n ")
	input.close()
print ""

print ""
print "Diseases Per Year"
print string.join(years,"|")
print string.join(diseases,"\n")
table = [[0 for i in range(len(years))] for i in range(len(diseases))]
input = open("generateddata.csv", "r")
for line in input:
	data = string.split(line, ",")
	for i in range(len(data)):
		data[i] = string.strip(data[i])
		if data[i] == "":
			data[i] = "none"
	table[diseases.index(data[6])][years.index(data[0])] += 1
print string.replace(str(table), "], ", "]\n ")
input.close()
print ""