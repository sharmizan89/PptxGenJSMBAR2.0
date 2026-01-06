/**
 * Simple Node.js test to verify PptxGenJS works correctly with the changes
 */

// Use the local built version
import pptxgen from './src/bld/pptxgen.es.js';

console.log('\n====== PptxGenJS Test Script ======\n');

async function runTests() {
    try {
        // Test 1: Basic presentation creation
        console.log('Test 1: Creating basic presentation...');
        const pptx = new pptxgen();
        console.log(`  - PptxGenJS version: ${pptx.version}`);
        console.log(`  - Default layout: ${pptx.layout}`);
        
        // Set metadata
        pptx.author = 'Test Author';
        pptx.title = 'Test Presentation';
        pptx.subject = 'Testing changes';
        
        // Test 2: Add a simple slide with text
        console.log('Test 2: Adding text slide...');
        const slide1 = pptx.addSlide();
        slide1.addText('Hello World - Test Presentation', { 
            x: 1, y: 1, w: 8, h: 1, 
            fontSize: 36, 
            bold: true, 
            color: '000000' 
        });
        slide1.addText('This slide tests basic text functionality', { 
            x: 1, y: 2.5, w: 8, h: 1, 
            fontSize: 18 
        });
        console.log('  ✓ Text slide created');
        
        // Test 3: Add slide with shapes (testing new default colors)
        console.log('Test 3: Adding shapes slide...');
        const slide2 = pptx.addSlide();
        slide2.addText('Shapes Test', { x: 1, y: 0.5, w: 8, h: 0.5, fontSize: 24 });
        // These colors are from the new BARCHART_COLORS array
        slide2.addShape(pptx.ShapeType.rect, { x: 1, y: 1.5, w: 2, h: 1, fill: { color: '006D89' } });
        slide2.addShape(pptx.ShapeType.ellipse, { x: 4, y: 1.5, w: 2, h: 1, fill: { color: 'DC7900' } });
        slide2.addShape(pptx.ShapeType.roundRect, { x: 7, y: 1.5, w: 2, h: 1, fill: { color: 'B92051' } });
        console.log('  ✓ Shapes slide created');
        
        // Test 4: Add slide with chart (testing new chart defaults)
        console.log('Test 4: Adding chart slide...');
        const slide3 = pptx.addSlide();
        slide3.addText('Chart Test', { x: 1, y: 0.3, w: 8, h: 0.5, fontSize: 24 });
        const chartData = [
            { name: 'Series 1', labels: ['Q1', 'Q2', 'Q3', 'Q4'], values: [10, 20, 30, 40] },
            { name: 'Series 2', labels: ['Q1', 'Q2', 'Q3', 'Q4'], values: [15, 25, 35, 45] }
        ];
        slide3.addChart(pptx.ChartType.bar, chartData, { 
            x: 0.5, y: 1, w: 9, h: 4,
            showValue: true
        });
        console.log('  ✓ Chart slide created');
        
        // Test 5: Add slide with table (testing new default borders)
        console.log('Test 5: Adding table slide...');
        const slide4 = pptx.addSlide();
        slide4.addText('Table Test', { x: 1, y: 0.5, w: 8, h: 0.5, fontSize: 24 });
        const tableRows = [
            [{ text: 'Header 1', options: { bold: true } }, { text: 'Header 2', options: { bold: true } }, { text: 'Header 3', options: { bold: true } }],
            ['Data 1', 'Data 2', 'Data 3'],
            ['Data 4', 'Data 5', 'Data 6']
        ];
        slide4.addTable(tableRows, { x: 1, y: 1.5, w: 8, colW: [2.5, 2.5, 2.5] });
        console.log('  ✓ Table slide created');
        
        // Test 6: Add slide with bullets (testing new bullet defaults)
        console.log('Test 6: Adding bullets slide...');
        const slide5 = pptx.addSlide();
        slide5.addText('Bullets Test', { x: 1, y: 0.5, w: 8, h: 0.5, fontSize: 24 });
        slide5.addText([
            { text: 'First level bullet (DEFAULT)', options: { bullet: true } },
            { text: 'Second level bullet (SECOND)', options: { bullet: { indentLevel: 1 } } },
            { text: 'Third level bullet (THIRD)', options: { bullet: { indentLevel: 2 } } },
            { text: 'Fourth level bullet (FOURTH)', options: { bullet: { indentLevel: 3 } } }
        ], { x: 1, y: 1.5, w: 8, h: 3 });
        console.log('  ✓ Bullets slide created');
        
        // Write the file
        console.log('\nWriting PPTX file...');
        const filename = await pptx.writeFile({ fileName: 'node-test-output.pptx' });
        console.log(`  ✓ File written: ${filename}`);
        
        console.log('\n====== ALL TESTS PASSED ======\n');
        
    } catch (error) {
        console.error('\n✗ TEST FAILED:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

runTests();
