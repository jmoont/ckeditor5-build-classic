import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import {
	downcastAttributeToElement
} from '@ckeditor/ckeditor5-engine/src/conversion/downcast-converters';

const linkElementSymbol = Symbol( 'linkElement' );

export default class LinkTargetPlugin extends Plugin {
	init() {
		const editor = this.editor;

		// Override the default downcast converter provided by the LinkEditing class.
		editor.conversion.for( 'downcast' )
			.add( downcastAttributeToElement( {
				model: 'linkHref',
				view: createLinkElement,
				priority: 'high'
			} ) );
	}
}

function createLinkElement( href, writer ) {

    var linkElement = writer.createAttributeElement( 'a', {
        href
    }, { priority: 5 } );
    
    if (typeof href === undefined || href === null) {
        linkElement = writer.createAttributeElement( 'a', {
            href
        }, { priority: 5 } );
    } else if (href.startsWith('http')){
        linkElement = writer.createAttributeElement( 'a', {
            href,
            target: '_blank'
        }, { priority: 5 } );
    }

    writer.setCustomProperty( linkElementSymbol, true, linkElement );

    return linkElement;
}