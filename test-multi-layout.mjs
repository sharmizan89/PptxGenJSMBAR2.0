import PptxGenJS from './src/bld/pptxgen.es.js';

async function testMultipleLayouts() {
    console.log('====== Testing Multiple Slide Layouts ======\n');

    const pptx = new PptxGenJS();
    pptx.defineLayout({ name: 'S-P Global EDP 2025 16-9', width: 13.333, height: 7.5 });
    pptx.layout = 'S-P Global EDP 2025 16-9';

    // Define multiple slide masters
    pptx.defineSlideMaster({
        title: 'Content - no subtitle',
        background: { color: 'FFFFFF' },
        objects: [
            { placeholder: { options: { name: 'headline', type: 'title', x: 0.52, y: 0.32, w: 12.30, h: 0.50 }, text: '[Headline]' } },
            { placeholder: { options: { name: 'mainContent', type: 'body', x: 0.52, y: 1.32, w: 12.30, h: 4.85 }, text: '[Content]' } }
        ]
    });

    pptx.defineSlideMaster({
        title: 'Title Slide',
        background: { color: 'D6002A' },
        objects: [
            { placeholder: { options: { name: 'title', type: 'title', x: 0.5, y: 3.0, w: 12.3, h: 1.0 }, text: '[Title]' } },
            { placeholder: { options: { name: 'subtitle', type: 'body', x: 0.5, y: 4.2, w: 12.3, h: 0.5 }, text: '[Subtitle]' } }
        ]
    });

    pptx.defineSlideMaster({
        title: 'Section Divider',
        background: { color: '000000' },
        objects: [
            { placeholder: { options: { name: 'sectionTitle', type: 'title', x: 0.5, y: 3.0, w: 12.3, h: 1.5 }, text: '[Section Title]' } }
        ]
    });

    // Add slides using different masters
    let slide1 = pptx.addSlide({ masterName: 'Content - no subtitle' });
    slide1.addText('Content Slide', { placeholder: 'headline' });

    let slide2 = pptx.addSlide({ masterName: 'Title Slide' });
    slide2.addText('Welcome', { placeholder: 'title' });

    let slide3 = pptx.addSlide({ masterName: 'Section Divider' });
    slide3.addText('Part 1', { placeholder: 'sectionTitle' });

    console.log('Writing PPTX with multiple layouts...');
    await pptx.writeFile({ fileName: 'test-multi-layout.pptx' });
    console.log('✓ File written: test-multi-layout.pptx\n');
    
    console.log('====== TEST COMPLETE ======');
}

testMultipleLayouts().catch(console.error);
