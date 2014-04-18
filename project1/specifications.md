# Datawarehouse and Datacube design for Medicare

The Australian government provides health care support for the citizens and
permanent residents of Australia through Medicare. Medicare has the following
responsibilities:

* supporting and monitoring doctors, hospitals and pathology clinics so that
patients get the highest level of service;
* supporting and monitoring patients so that every patient gets equal and fair
access to quality health care;
* monitoring the health care facilities in the country, states and territories
so that the government can identify the deficiencies in the system and improve
the health care infrastructure;
* detecting any possible fraudulent behaviour by all the involved parties;

While it is hard to outline all sorts of data that Medicare collects, we can
simplify the data into the following categories (we will refer to a doctor,
hospital or pathology clinic by the term health care provider or provider):

* Every patient carries a Medicare card when they visit a health care provider.
The patient's and the provider's details, the date and the treatment provided
are recorded in the system. Medicare pays the appropriate charges directly to
the health care provider. The patient does not pay anything.
* The system records all the details regarding pathological and other tests that
a patient undergoes through the referral of a health care provider.
* Patients can consult a specialist only when a general physician (GP) issues a
referral for such consultation. The system records the details of the
specialist, the GP and the patient.
* Many people in Australia have private health insurance and Medicare usually
contributes a part of the cost of treatment along with the private insurer. A
patient's private health insurance details (if any) are recorded in all such
cases.
* Many non-emergency treatments in public hospitals usually incur delays. The
system records the date when a patient registers for a treatment and the date
when the treatment is actually provided.
* There is a limit on how much pharmaceutical benefit a patient can get within a
financial year. The patient has to pay any extra over this limit. The system
records such expenses incurred by patients.
* Each family is issued a single Medicare card and the names of the family
members appear on this card. Medicare database can track treatments and expenses
for each family.

Medicare has several different databases that record its transactions for the
last five years (2006-2011). Medicare plans to implement a data warehouse for
analysis and planning and has called for a nationwide tender. You are bidding
for this lucrative project. Your tender submission should consist of the
following:

* You should design a good quality data warehouse schema.
* You should include detailed discussions with examples how your data cube can
assist Medicare in analysing its expenditure, advising the government for
planning new infrastructure, detecting fraud and changing its policies. A few
examples of such analysis are given below, however these examples are by no
means exhaustive and you should try to provide a good number of examples to
improve the quality of your tender submission.
* You should illustrate your examples by implementing a prototype data cube in
Palo and including the screenshots that show solutions for ten important example
scenarios that your design will be able to handle.
* Like any tender submission process, you should not contact any other parties
who are submitting the same tender to know the details of their submission.
However, you can discuss the general issues with anyone.
* Unfortunately Medicare will not be able to pay you any $ for your submission,
but you will be rewarded with good marks.
* You can make any reasonable assumptions for implementing the prototype, e.g.,
a small number of patients, diseases, physicians, hospitals, specialists,
pathology clinics etc., changing the process how Medicare collects its data and
any other suggestions that you deem feasible and necessary to improve the
services provided by Medicare.

A few example analysis scenarios:

* Medicare has a policy that every physician should spend at least half an hour
for each patient. The system should be able to report if a physician is taking
unfair advantage of the system by examining an excessive number of patients.
* Some patients may misuse prescription drugs and consult a number of physicians
within a short time just to get new prescriptions. The system should be able to
detect this.
* The system should be able to detect whether there is any collusion between a
GP and a specialist where the GP issues referrals to the specialist for an
excessive number of patients. Though this is hard to detect, there could be a
trend over time.
* It should be possible to analyse whether there are significant trends in the
occurrence and cure of particular diseases across the country.
* It should be possible to analyse the infrastructure (or lack thereof) by
analysing the waiting time of patients.
* It should be possible to do all analysis for the entire country as well as for
individual state or territory.
* It should be possible to analyse trends, e.g., whether there is any trend if
the same analysis is run over different years. Each year is divided into
quarters for convenience.

**Note:** You can submit a tender either individually or with another group
member.

**Note:** If you think the specification provided by Medicare is vague,
imprecise or incomplete, you are correct. Medicare wants you to suggest a
quality solution. Medicare is prepared to change its transactional database
structures and/or data collection procedures if your solution is very
impressive.

**Note:** As we are working as consultants for Medicare, we can answer questions
regarding this specification in the help3401 forum.

**Amitava Datta**  
**March 2014**