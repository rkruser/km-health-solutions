'''
Patient object hierarchy

Design goals:
1. Represent patient as hierarchy of data which can be rendered into token sequences
2. If patient data cannot fit into context window, iterate API calls up the tree to fit it into context window
3. Should be able to stringify/tokenify any patient time window for AI calls (and perhaps select which type of records to focus on)
4. Non-leaf nodes are summaries of leaf nodes



Sidebar: What Elizabeth (Radiologist from the open house) told me: 
- Having radiology software (starts with D, international standard (diacom?)) talk directly to EHR/EMR (like Epic).
   Right now it goes through PACS, but that's not great, and there's demand for it to be more efficient (but security is problem).
- Talk directly to hospital IT about integration

What Rob told me:
- Set deadlines and work toward them
- Azure, Google cloud, AWS are the big three. Can be expensive
- He uses Jira for productivity
- Terminology: "Overhead", "Technical debt", "Sprint", "Development stage", "Testing stage"
- SCRUM: two-week deadlines or so (versus AGILE)
- What I'll add: (Core tasks vs. Slack time tasks)

- Docker is useful for encapsulation: learn it
- Test things initially with free or cheap server versions
'''

import random


class RecordNode:
    def __init__(self, data=None, children=None):
        self.data = data
        self.children = children

    def __str__(self):
        s = 'Record:'
        s += str(self.data) + ';'
        if self.children is not None:
            s += '(Children:'
            for c in self.children:
                s += str(c)
            s += ');'
        return s
    
    def __repr__(self):
        return str(self)


def getRecordContextLength(record):
    if record.data is not None:
        return len(record.data) #Later replace with token length (maybe even store as set of tokens)
    else:
        return 0

def computeTokenLengths(recordList):
    recordLengths = []
    for record in recordList:
        recordLengths.append(getRecordContextLength(record))
    return recordLengths

def computePrefixSums(numberList):
    accumulator = 0
    prefixSums = [] 
    for n in numberList:
        accumulator += n
        prefixSums.append(accumulator) #This is by value, I think
    return prefixSums

def computeRecordSlices(numberList, context_length):
    beginSlice = 0
    accumulator = 0
    slices = []
    for i, n in enumerate(numberList):
        if  ((accumulator + n) > context_length) and (i>beginSlice):
            slices.append((beginSlice, i))
            beginSlice = i
            accumulator = 0
        
        accumulator += n
    
    slices.append((beginSlice, len(numberList))) #append the very last slice
    return slices

    
def constructBaseRecords(stringList):
    nodes = []
    for s in stringList:
        nodes.append(RecordNode(data=s))
    return nodes

def buildPatientTreeLevel(recordList, MAX_CONTEXT_LENGTH):
    recordLengths = computeTokenLengths(recordList)
    #cumulativeLengths = computePrefixSums(recordLengths)
    slices = computeRecordSlices(recordLengths, MAX_CONTEXT_LENGTH)

    nodes = []
    for s in slices:
        nodes.append(RecordNode(children=recordList[s[0]:s[1]]))
    
    return nodes


def testSlices():
    a = [19, 3, 1, 4, 5, 2, 3, 4, 2, 5, 3, 2, 1, 1, 4, 5, 3, 3, 2, 1, 1]
    maxl = 8
    print(len(a))
    print(computeRecordSlices(a, maxl))

    # Expected: [(0,3), (3,4), (4,6), (6, 8), (8,10), (10,14), (14, 15), (15,17), (17,end)]


def randomString():
    length = random.randint(2,20)
    chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,;.'
    s = ''
    for _ in range(length):
        nd = random.randint(0,len(chars)-1)
        #print(nd, len(chars))
        s += chars[nd]
    return s

def testBuildTree():
    stringList = [randomString() for _ in range(20)]
    recordList = constructBaseRecords(stringList)
    groupedNodes = buildPatientTreeLevel(recordList, 40)

    print(stringList)
    print(recordList)
    print(groupedNodes)

#testSlices()
testBuildTree()