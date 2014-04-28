import random
import sys


medicarenumber = 0
medicarenumberjump = random.randrange(21130887, 250301387)

# Firstnames
filefirstnames = open('firstnames.txt', 'r')
firstnames = list(filefirstnames)
filefirstnames.close()

for i in range(len(firstnames)):
	firstnames[i] = firstnames[i].strip()
random.shuffle(firstnames)

# Surnames
filesurnames = open('surnames.txt', 'r')
surnames = list(filesurnames)
filesurnames.close()

for i in range(len(surnames)):
	surnames[i] = surnames[i].strip()
random.shuffle(surnames)

# States
filestates = open('states.txt', 'r')
states = list(filestates)
filesurnames.close()

for i in range(len(states)):
	states[i] = states[i].strip()
random.shuffle(states)

# Medical Centres
filecentres = open('clinics.txt', 'r')
centres = list(filecentres)
filecentres.close()

for i in range(len(centres)):
	centres[i] = centres[i].strip()
random.shuffle(centres)

# Tests
filetests = open('tests.txt', 'r')
tests = list(filetests)
filetests.close()

for i in range(len(tests)):
	tests[i] = tests[i].strip()
random.shuffle(tests)

# Diseases
filediseases = open('diseases.txt', 'r')
diseases = list(filediseases)
filediseases.close()

for i in range(len(diseases)):
	diseases[i] = diseases[i].strip()
random.shuffle(diseases)

for i in range(len(tests)):
	tests[i] = tests[i].strip()
random.shuffle(tests)

# Create a random person and give them a place to live
def generatePerson():
	global medicarenumber
	fname = firstnames[medicarenumber % len(firstnames)]
	sname = surnames[medicarenumber / len(firstnames)]
	medicarenumber = medicarenumber + random.randrange(0,20)
	state = random.choice(states)
	return (medicarenumber + medicarenumberjump, fname + " " + sname, state)

# Create a place for people to visit
medicalcentres = [[] for i in range(len(states))]
for state in states:
	random.shuffle(centres)
	medicalcentres[states.index(state)].append(centres[0] + " " + state)
	medicalcentres[states.index(state)].append(centres[1] + " " + state)
	medicalcentres[states.index(state)].append(centres[2] + " " + state)

# Generate a visit to a medical centre
def generateVisit(state):
	visit = None
	test = random.choice(tests)
	disease = ""
	referredto = ""
	specialists = ["chiropractor", "massager", "intensive surgery", "nobody in particular"]
	if random.random() > 0.25:
		if random.random() > 0.5:
			disease = diseases[tests.index(test)]
	if disease is not "" or random.random() > 0.95:
		referredto = random.choice(specialists)
	mc = random.choice([0, 1, 2])
	time = random.choice([15, 30, 45, 60])
	cost = (mc + 1) * 2 * time
	visit = (medicalcentres[states.index(state)][mc], test, disease, referredto, time, cost)
	
	return visit

def generateData(number):
	output = open('generateddata.csv', 'w')
	peopledata = open('peopledata.csv', 'w')
	medicaldata = open('medicaldata.csv', 'w')
	#print str(medicalcentres)
	
	for state in medicalcentres:
		for mc in state:
			medicaldata.write(mc + "\n")
	
	for i in range(number):
		person = generatePerson()
		peopledata.write(str(person[0]) + "\n")
		for year in range(2006, 2012):
			for quarter in ["Q1", "Q2", "Q3", "Q4"]:
				if random.random() > 0.99:
					visitcount = random.randrange(2,8)
				else:
					visitcount = random.randrange(0,2)
				while visitcount > 0:
					visit = generateVisit(str(person[2]))
					#print str(person) + " " + str(visit)
					output.write(str(year) + ", " + str(quarter) + ", " + str(person[0]) + ", " + str(person[2]) + ", " + str(visit[0]) + ", " + str(visit[1]) + ", " + str(visit[2]) + ", " + str(visit[3]) + ", " + str(visit[4]) + ", " + str(visit[5]) + "\n")
					visitcount -= 1
	output.close()
	peopledata.close()
	medicaldata.close()

if __name__ == "__main__":
	number = 250
	if len(sys.argv) == 2:
		number = sys.argv[1]
	print "Generating " + str(number) + " people"
	generateData(number)
